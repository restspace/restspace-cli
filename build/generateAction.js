var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
import fs from "fs/promises";
import path from "path";
function scanDir(absPath) {
    return __asyncGenerator(this, arguments, function scanDir_1() {
        var entries, _i, entries_1, ent, entAbsPath, _a, _b, chord, e_1_1, target, _c, _d, chord, e_2_1;
        var e_1, _e, e_2, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, __await(fs.readdir(absPath, { withFileTypes: true }))];
                case 1:
                    entries = _g.sent();
                    _i = 0, entries_1 = entries;
                    _g.label = 2;
                case 2:
                    if (!(_i < entries_1.length)) return [3 /*break*/, 37];
                    ent = entries_1[_i];
                    entAbsPath = path.join(absPath, ent.name);
                    if (!ent.isDirectory()) return [3 /*break*/, 17];
                    if (!(ent.name === 'node_modules')) return [3 /*break*/, 16];
                    _g.label = 3;
                case 3:
                    _g.trys.push([3, 10, 11, 16]);
                    _a = (e_1 = void 0, __asyncValues(scanDir(entAbsPath)));
                    _g.label = 4;
                case 4: return [4 /*yield*/, __await(_a.next())];
                case 5:
                    if (!(_b = _g.sent(), !_b.done)) return [3 /*break*/, 9];
                    chord = _b.value;
                    return [4 /*yield*/, __await(chord)];
                case 6: return [4 /*yield*/, _g.sent()];
                case 7:
                    _g.sent();
                    _g.label = 8;
                case 8: return [3 /*break*/, 4];
                case 9: return [3 /*break*/, 16];
                case 10:
                    e_1_1 = _g.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 16];
                case 11:
                    _g.trys.push([11, , 14, 15]);
                    if (!(_b && !_b.done && (_e = _a.return))) return [3 /*break*/, 13];
                    return [4 /*yield*/, __await(_e.call(_a))];
                case 12:
                    _g.sent();
                    _g.label = 13;
                case 13: return [3 /*break*/, 15];
                case 14:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 15: return [7 /*endfinally*/];
                case 16: return [3 /*break*/, 36];
                case 17:
                    if (!ent.isFile()) return [3 /*break*/, 21];
                    if (!(ent.name === 'services.json')) return [3 /*break*/, 20];
                    return [4 /*yield*/, __await(entAbsPath)];
                case 18: return [4 /*yield*/, _g.sent()];
                case 19:
                    _g.sent();
                    _g.label = 20;
                case 20: return [3 /*break*/, 36];
                case 21:
                    if (!ent.isSymbolicLink()) return [3 /*break*/, 36];
                    return [4 /*yield*/, __await(fs.readlink(entAbsPath))];
                case 22:
                    target = _g.sent();
                    _g.label = 23;
                case 23:
                    _g.trys.push([23, 30, 31, 36]);
                    _c = (e_2 = void 0, __asyncValues(scanDir(target)));
                    _g.label = 24;
                case 24: return [4 /*yield*/, __await(_c.next())];
                case 25:
                    if (!(_d = _g.sent(), !_d.done)) return [3 /*break*/, 29];
                    chord = _d.value;
                    return [4 /*yield*/, __await(chord)];
                case 26: return [4 /*yield*/, _g.sent()];
                case 27:
                    _g.sent();
                    _g.label = 28;
                case 28: return [3 /*break*/, 24];
                case 29: return [3 /*break*/, 36];
                case 30:
                    e_2_1 = _g.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 36];
                case 31:
                    _g.trys.push([31, , 34, 35]);
                    if (!(_d && !_d.done && (_f = _c.return))) return [3 /*break*/, 33];
                    return [4 /*yield*/, __await(_f.call(_c))];
                case 32:
                    _g.sent();
                    _g.label = 33;
                case 33: return [3 /*break*/, 35];
                case 34:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 35: return [7 /*endfinally*/];
                case 36:
                    _i++;
                    return [3 /*break*/, 2];
                case 37:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
export var generateAction = function (dirPath) { return __awaiter(void 0, void 0, void 0, function () {
    var absDirPath, absPath, chords, _a, _b, chordFile, chord, chordBuf, chordStr, err_1, e_3_1;
    var e_3, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!dirPath)
                    dirPath = ".";
                absDirPath = path.resolve(process.cwd(), dirPath);
                absPath = path.resolve(absDirPath, "./node_modules");
                console.log("Scanning " + absPath + "...");
                chords = {};
                _d.label = 1;
            case 1:
                _d.trys.push([1, 10, 11, 16]);
                _a = __asyncValues(scanDir(absPath));
                _d.label = 2;
            case 2: return [4 /*yield*/, _a.next()];
            case 3:
                if (!(_b = _d.sent(), !_b.done)) return [3 /*break*/, 9];
                chordFile = _b.value;
                console.log("Found " + chordFile);
                chord = { id: 'none' };
                _d.label = 4;
            case 4:
                _d.trys.push([4, 6, , 7]);
                return [4 /*yield*/, fs.readFile(chordFile)];
            case 5:
                chordBuf = _d.sent();
                chordStr = chordBuf.toString();
                chord = JSON.parse(chordStr);
                return [3 /*break*/, 7];
            case 6:
                err_1 = _d.sent();
                console.error("Failed to parse at " + chordFile + ": " + err_1);
                return [3 /*break*/, 8];
            case 7:
                if (chords[chord.id]) {
                    console.log("Ignored duplicated chord id: " + chord.id);
                }
                else {
                    chords[chord.id] = chord;
                }
                _d.label = 8;
            case 8: return [3 /*break*/, 2];
            case 9: return [3 /*break*/, 16];
            case 10:
                e_3_1 = _d.sent();
                e_3 = { error: e_3_1 };
                return [3 /*break*/, 16];
            case 11:
                _d.trys.push([11, , 14, 15]);
                if (!(_b && !_b.done && (_c = _a.return))) return [3 /*break*/, 13];
                return [4 /*yield*/, _c.call(_a)];
            case 12:
                _d.sent();
                _d.label = 13;
            case 13: return [3 /*break*/, 15];
            case 14:
                if (e_3) throw e_3.error;
                return [7 /*endfinally*/];
            case 15: return [7 /*endfinally*/];
            case 16: return [4 /*yield*/, fs.writeFile(path.join(absDirPath, 'services.json'), JSON.stringify(chords))];
            case 17:
                _d.sent();
                return [2 /*return*/];
        }
    });
}); };
