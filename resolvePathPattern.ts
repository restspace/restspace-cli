export function slashTrim(s: string): string {
    let start = 0;
    let end = s.length;
    if (s[start] === '/') start++;
    if (s[end - 1] === '/') end--;
    if (end <= start) return '';
    return s.substring(start, end);
}

enum ScanState {
    Scanning,
    Initial,
    PathPosition,
    PathPosition2,
    DotPosition,
    Default,
    DonePathPosition,
    UntilRBracketDefault,
    Fail
}

const getParts = (path?: string) => slashTrim(path || '').split('/').filter(part => part !== '');
const pullInteger = (pos: number, s: string) => {
    let val = 0;
    while (pos < s.length && s[pos] >= '0' && s[pos] <= '9') {
        val = val * 10 + parseInt(s[pos]);
        pos++
    }
    pos--;
    return [ pos, val ];
}
const getSegments = (part: string[], ch0: string, ch1: string, n0: number, n1: number) => {
    const pos0 = ch0 === '>' ? n0 : part.length - n0 - 1;
    const pos1 = ch1 == '' ? pos0 + 1
        : ch1 === '>' ? n1 + 1 : part.length - n1; // +1 as slice is exclusive of final pos
    return part.slice(pos0, pos1);
}
const dotSplit = (segment: string, spec: string) => {
    let pos0, pos1;
    const dotParts = segment.split('.');
    switch (spec) {
        case '?.':
            pos0 = 0;
            pos1 = 1;
            break;
        case '*.':
            pos0 = 0;
            pos1 = dotParts.length - 1;
            break;
        case '.?':
            pos0 = dotParts.length - 1;
            pos1 = dotParts.length;
            break;
        case '.*':
            pos0 = 1;
            pos1 = dotParts.length;
            break;
    }
    return dotParts.slice(pos0, pos1).join('.');
}

export interface SubstitutionSources {
    currentPath: string;
    basePath?: string;
    subPath?: string;
}

export function resolvePathPattern(pathPattern: string, sources: SubstitutionSources) {
    let pos = 0;
    let state = ScanState.Scanning;
    let output = [] as string[];
    let part = [] as string[];
    let marker0 = '';
    let markerPos0 = -1;
    let partialOutput = [] as string[];
    let bracketedVal = [] as string[];
    let ignoreMode = false;
    while (pos < pathPattern.length) {
        let ch = pathPattern[pos];
        switch (state) {
            case ScanState.Scanning:
                if (ch === '$') {
                    state = ScanState.Initial;
                    part = [];
                    marker0 = '';
                    markerPos0 = -1;
                    if (partialOutput.length) ignoreMode = true;
                    bracketedVal = [];
                } else {
                    output.push(ch);
                }
                break;
            case ScanState.Initial:
                state = ScanState.PathPosition;
                part =
                    ch === 'B' ? getParts(sources.basePath)
                    : ch === 'S' ? getParts(sources.subPath)
                    : ch === 'P' ? getParts(sources.basePath).concat(getParts(sources.currentPath))
                    : getParts(sources.currentPath);
                if (!"BSP".includes(ch)) pos--;
                break;
            case ScanState.PathPosition:
                if (ch === '*') {
                    if (!ignoreMode) partialOutput = [ ...part ];
                    state = ScanState.DotPosition;
                } else if (ch === '<' || ch === '>') {
                    pos++;
                    const [ newPos, newMarkerPos0 ] = pullInteger(pos, pathPattern);
                    if (newPos === pos - 1) { state = ScanState.Fail; break; }
                    pos = newPos;
                    marker0 = ch;
                    markerPos0 = newMarkerPos0;
                    state = ScanState.PathPosition2;
                }
                break;
            case ScanState.PathPosition2:
                let marker1 = '';
                let markerPos1 = 0;
                if (ch === '<' || ch === '>') {
                    pos++;
                    const [ newPos, newMarkerPos1 ] = pullInteger(pos, pathPattern);
                    if (newPos === pos - 1) { state = ScanState.Fail; break; }
                    pos = newPos;
                    marker1 = ch;
                    markerPos1 = newMarkerPos1;
                } else {
                    pos--;
                }
                if (!ignoreMode) partialOutput = getSegments(part, marker0, marker1, markerPos0, markerPos1);
                state = ScanState.DotPosition;
                break;
            case ScanState.DotPosition:
                if (ch === '|') {
                    pos++;
                    const front = pathPattern.substr(pos, 3);
                    if (front === '?.|' || front === '*.|' || front === '.?|' || front === '.*|') {
                        if (!ignoreMode) {
                            partialOutput[partialOutput.length - 1] =
                                dotSplit(partialOutput[partialOutput.length - 1] || '', front.substr(0, 2));
                        }
                        pos += 2;
                        state = ScanState.Default;
                    } else {
                        state = ScanState.DonePathPosition;
                        pos--;
                    }
                } else {
                    state = ScanState.Default;
                    pos--;
                }
                break;
            case ScanState.Default:
                if (ch === ':') {
                    if (pathPattern.length > pos+1 && pathPattern[pos+1] === '(') {
                        pos++;
                        state = ScanState.UntilRBracketDefault;
                    } else if (pathPattern.length > pos+1 && pathPattern[pos+1] === '$') {
                        state = ScanState.Scanning;
                    }
                } else {
                    state = ScanState.DonePathPosition;
                    pos--;
                }
                break;
            case ScanState.UntilRBracketDefault:
                if (ch === ')') {
                    if (partialOutput.length === 0) partialOutput = [ bracketedVal.join('') ];
                    state = ScanState.DonePathPosition;
                } else {
                    bracketedVal.push(ch);
                }
                break;
            case ScanState.DonePathPosition:
                output = output.concat(partialOutput.join('/'));
                state = ScanState.Scanning;
                ignoreMode = false;
                partialOutput = [];
                pos--;
                break;
        }
        if (state !== ScanState.Fail) pos++;
    }

    switch (state) {
        case ScanState.PathPosition2:
            if (!ignoreMode) partialOutput = getSegments(part, marker0, '', markerPos0, 0);
            output = output.concat(partialOutput.join('/'));
            break;
        case ScanState.DotPosition:
        case ScanState.Default:
        case ScanState.DonePathPosition:
            output = output.concat(partialOutput.join('/'));
            break;
    }
    return output.join('');
}