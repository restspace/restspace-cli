var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
export function resolvePathPattern(pathPattern, currentPath, basePath, subPath) {
    if (!pathPattern)
        return '';
    var getParts = function (path) { return slashTrim(path || '').split('/').filter(function (part) { return part !== ''; }); };
    var pathParts = getParts(currentPath);
    var basePathParts = getParts(basePath);
    var subPathParts = getParts(subPath);
    var fullPathParts = basePathParts.concat(pathParts);
    var getPartsMatch = function (section, position0, position1) {
        try {
            var parts = pathParts;
            if (section === 'B')
                parts = basePathParts;
            if (section === 'S')
                parts = subPathParts;
            if (section === 'P')
                parts = fullPathParts;
            var pos0 = parseInt(position0.substr(1));
            if (position0.startsWith('<'))
                pos0 = -pos0 - 1;
            var match = '';
            if (position1) {
                var pos1 = parseInt(position1.substr(1));
                if (position1.startsWith('<'))
                    pos1 = -pos1 - 1;
                match = (pos1 === -1 ? parts.slice(pos0) : parts.slice(pos0, pos1 + 1)).join('/');
            }
            else {
                match = pos0 >= 0 ? parts[pos0] : parts[parts.length + pos0];
            }
            return match || '';
        }
        catch (_a) {
            return '';
        }
    };
    var result = pathPattern
        .replace(/\$([BSP])?([<>]\d+)([<>]\d+)?(:\((.+?)\)|:\$([BSP])?([<>]\d+)([<>]\d+)?)?/g, function (_match, p1, p2, p3, p4, p5, p6, p7, p8) {
        var partsMatch = getPartsMatch(p1, p2, p3);
        if (partsMatch || !p4)
            return partsMatch;
        if (p4.startsWith(':('))
            return p5;
        return getPartsMatch(p6, p7, p8);
    });
    return result;
}
export function slashTrim(s) {
    var start = 0;
    var end = s.length;
    if (s[start] === '/')
        start++;
    if (s[end - 1] === '/')
        end--;
    if (end <= start)
        return '';
    return s.substring(start, end);
}
var ScanState;
(function (ScanState) {
    ScanState[ScanState["Scanning"] = 0] = "Scanning";
    ScanState[ScanState["Initial"] = 1] = "Initial";
    ScanState[ScanState["PathPosition"] = 2] = "PathPosition";
    ScanState[ScanState["PathPosition2"] = 3] = "PathPosition2";
    ScanState[ScanState["DotPosition"] = 4] = "DotPosition";
    ScanState[ScanState["Default"] = 5] = "Default";
    ScanState[ScanState["DonePathPosition"] = 6] = "DonePathPosition";
    ScanState[ScanState["UntilRBracketDefault"] = 7] = "UntilRBracketDefault";
    ScanState[ScanState["Fail"] = 8] = "Fail";
})(ScanState || (ScanState = {}));
var getParts = function (path) { return slashTrim(path || '').split('/').filter(function (part) { return part !== ''; }); };
var pullInteger = function (pos, s) {
    var val = 0;
    while (pos < s.length && s[pos] >= '0' && s[pos] <= '9') {
        val = val * 10 + parseInt(s[pos]);
        pos++;
    }
    pos--;
    return [pos, val];
};
var getSegments = function (part, ch0, ch1, n0, n1) {
    var pos0 = ch0 === '>' ? n0 : part.length - n0 - 1;
    var pos1 = ch1 == '' ? pos0 + 1
        : ch1 === '<' ? n1 + 1 : part.length - n1; // +1 as slice is exclusive of final pos
    return part.slice(pos0, pos1);
};
var dotSplit = function (segment, spec) {
    var pos0, pos1;
    var dotParts = segment.split('.');
    switch (spec) {
        case '<.':
            pos0 = 0;
            pos1 = 1;
            break;
        case '>.':
            pos0 = 0;
            pos1 = dotParts.length - 1;
        case '.>':
            pos0 = dotParts.length - 1;
            pos1 = dotParts.length;
        case '.<':
            pos0 = 1;
            pos1 = dotParts.length;
    }
    return dotParts.slice(pos0, pos1).join('.');
};
export function pathp(pathPattern, sources) {
    var pos = 0;
    var state = ScanState.Scanning;
    var output = [];
    var part = [];
    var marker0 = '';
    var markerPos0 = -1;
    var partialOutput = [];
    var bracketedVal = [];
    while (pos < pathPattern.length) {
        var ch = pathPattern[pos];
        switch (state) {
            case ScanState.Scanning:
                if (ch === '$') {
                    state = ScanState.Initial;
                    part = [];
                    marker0 = '';
                    markerPos0 = -1;
                    partialOutput = [];
                    bracketedVal = [];
                }
                else {
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
                if (!"BSP".includes(ch))
                    pos--;
                break;
            case ScanState.PathPosition:
                if (ch === '*') {
                    partialOutput = __spreadArrays(part);
                }
                else if (ch === '<' || ch === '>') {
                    pos++;
                    var _a = pullInteger(pos, pathPattern), newPos = _a[0], newMarkerPos0 = _a[1];
                    if (newPos === pos - 1) {
                        state = ScanState.Fail;
                        break;
                    }
                    pos = newPos;
                    marker0 = ch;
                    markerPos0 = newMarkerPos0;
                    state = ScanState.PathPosition2;
                }
                break;
            case ScanState.PathPosition2:
                var marker1 = '';
                var markerPos1 = 0;
                if (ch === '<' || ch === '>') {
                    pos++;
                    var _b = pullInteger(pos, pathPattern), newPos = _b[0], newMarkerPos1 = _b[1];
                    if (newPos === pos - 1) {
                        state = ScanState.Fail;
                        break;
                    }
                    pos = newPos;
                    marker1 = ch;
                    markerPos1 = newMarkerPos1;
                }
                else {
                    pos--;
                }
                partialOutput = getSegments(part, marker0, marker1, markerPos0, markerPos1);
                state = ScanState.DotPosition;
                break;
            case ScanState.DotPosition:
                if (ch === '|') {
                    pos++;
                    var front = pathPattern.substr(pos, 3);
                    if (front === '<.|' || front === '>.|' || front === '.<|' || front === '.>|') {
                        partialOutput[partialOutput.length - 1] =
                            dotSplit(partialOutput[partialOutput.length - 1], front.substr(0, 2));
                        pos += 2;
                        state = ScanState.Default;
                    }
                    else {
                        state = ScanState.DonePathPosition;
                        pos--;
                    }
                }
                else {
                    state = ScanState.Default;
                    pos--;
                }
                break;
            case ScanState.Default:
                if (ch === ':' && pathPattern[pos + 1] === '(') {
                    pos++;
                    state = ScanState.UntilRBracketDefault;
                }
                else {
                    state = ScanState.DonePathPosition;
                    pos--;
                }
                break;
            case ScanState.UntilRBracketDefault:
                if (ch === ')') {
                    if (partialOutput === [])
                        partialOutput = [bracketedVal.join('')];
                    state = ScanState.DonePathPosition;
                    pos--;
                }
                else {
                    bracketedVal.push(ch);
                }
                break;
            case ScanState.DonePathPosition:
                output = output.concat(partialOutput);
                state = ScanState.Scanning;
                pos--;
                break;
        }
        if (state !== ScanState.Fail)
            pos++;
    }
    return output.join('');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZVBhdGhQYXR0ZXJuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vcmVzb2x2ZVBhdGhQYXR0ZXJuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxNQUFNLFVBQVUsa0JBQWtCLENBQUMsV0FBbUIsRUFBRSxXQUFtQixFQUFFLFFBQWlCLEVBQUUsT0FBZ0I7SUFDNUcsSUFBSSxDQUFDLFdBQVc7UUFBRSxPQUFPLEVBQUUsQ0FBQztJQUM1QixJQUFNLFFBQVEsR0FBRyxVQUFDLElBQWEsSUFBSyxPQUFBLFNBQVMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksS0FBSyxFQUFFLEVBQVgsQ0FBVyxDQUFDLEVBQTVELENBQTRELENBQUM7SUFDakcsSUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3hDLElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6QyxJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsSUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0RCxJQUFNLGFBQWEsR0FBRyxVQUFDLE9BQWUsRUFBRSxTQUFpQixFQUFFLFNBQWlCO1FBQ3hFLElBQUk7WUFDQSxJQUFJLEtBQUssR0FBRyxTQUFTLENBQUM7WUFDdEIsSUFBSSxPQUFPLEtBQUssR0FBRztnQkFBRSxLQUFLLEdBQUcsYUFBYSxDQUFDO1lBQzNDLElBQUksT0FBTyxLQUFLLEdBQUc7Z0JBQUUsS0FBSyxHQUFHLFlBQVksQ0FBQztZQUMxQyxJQUFJLE9BQU8sS0FBSyxHQUFHO2dCQUFFLEtBQUssR0FBRyxhQUFhLENBQUM7WUFDM0MsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxN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