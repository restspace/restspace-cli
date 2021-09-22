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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import fs from "fs/promises";
import path from "path";
import { fetchCreds } from "./fetchCreds";
import { applicationRoot, canRead, publicRoot } from "./files";
function scanDir(absPath, mode) {
    return __asyncGenerator(this, arguments, function scanDir_1() {
        var entries, name, _i, entries_1, ent, entAbsPath, recurse, nextMode, _a, _b, chord, e_1_1, target, _c, _d, chord, e_2_1;
        var e_1, _e, e_2, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, __await(fs.readdir(absPath, { withFileTypes: true }))];
                case 1:
                    entries = _g.sent();
                    name = path.parse(absPath).name;
                    _i = 0, entries_1 = entries;
                    _g.label = 2;
                case 2:
                    if (!(_i < entries_1.length)) return [3 /*break*/, 37];
                    ent = entries_1[_i];
                    entAbsPath = path.join(absPath, ent.name);
                    if (!ent.isDirectory()) return [3 /*break*/, 17];
                    recurse = mode !== "project-dir" || ent.name === "node_modules";
                    if (!recurse) return [3 /*break*/, 16];
                    nextMode = "project-dir";
                    if (ent.name === "node_modules")
                        nextMode = "node_modules";
                    else if (ent.name.startsWith("@"))
                        nextMode = "namespace-dir";
                    _g.label = 3;
                case 3:
                    _g.trys.push([3, 10, 11, 16]);
                    _a = (e_1 = void 0, __asyncValues(scanDir(entAbsPath, nextMode)));
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
                    _c = (e_2 = void 0, __asyncValues(scanDir(target, "project-dir")));
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
    var absDirPath, _a, _b, absPath, chords, _c, _d, chordFile, chord, chordBuf, chordStr, err_1, _i, _e, serviceConfig, localDirPath, err_2, e_3_1, _f, base, publicRootPath, restspaceJson, restspaceJsonPath, services, servicesJsonPath;
    var e_3, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                if (!dirPath)
                    dirPath = ".";
                _b = (_a = path).resolve;
                return [4 /*yield*/, applicationRoot()];
            case 1:
                absDirPath = _b.apply(_a, [_h.sent(), dirPath]);
                absPath = path.resolve(absDirPath, "./node_modules");
                console.log("Scanning " + absPath + "...");
                chords = {};
                _h.label = 2;
            case 2:
                _h.trys.push([2, 18, 19, 24]);
                _c = __asyncValues(scanDir(absPath, "node_modules"));
                _h.label = 3;
            case 3: return [4 /*yield*/, _c.next()];
            case 4:
                if (!(_d = _h.sent(), !_d.done)) return [3 /*break*/, 17];
                chordFile = _d.value;
                console.log("Found " + chordFile);
                chord = { id: 'none' };
                _h.label = 5;
            case 5:
                _h.trys.push([5, 7, , 8]);
                return [4 /*yield*/, fs.readFile(chordFile)];
            case 6:
                chordBuf = _h.sent();
                chordStr = chordBuf.toString();
                chord = JSON.parse(chordStr);
                return [3 /*break*/, 8];
            case 7:
                err_1 = _h.sent();
                console.error("Failed to parse at " + chordFile + ": " + err_1);
                return [3 /*break*/, 16];
            case 8:
                if (!chords[chord.id]) return [3 /*break*/, 9];
                console.log("Ignored duplicated chord id: " + chord.id);
                return [3 /*break*/, 16];
            case 9:
                chords[chord.id] = chord;
                _i = 0, _e = chord.newServices || [];
                _h.label = 10;
            case 10:
                if (!(_i < _e.length)) return [3 /*break*/, 16];
                serviceConfig = _e[_i];
                console.log(serviceConfig);
                if (!serviceConfig.localDir) return [3 /*break*/, 15];
                localDirPath = path.join.apply(path, __spreadArrays([absDirPath, 'serviceFiles'], serviceConfig.localDir.path.split('/')));
                console.log(localDirPath);
                return [4 /*yield*/, canRead(localDirPath)];
            case 11:
                if (!!(_h.sent())) return [3 /*break*/, 15];
                _h.label = 12;
            case 12:
                _h.trys.push([12, 14, , 15]);
                console.log('trying to make ' + localDirPath);
                return [4 /*yield*/, fs.mkdir(localDirPath, { recursive: true })];
            case 13:
                _h.sent();
                console.log("Created service files directory for " + serviceConfig.name + " at " + localDirPath);
                return [3 /*break*/, 15];
            case 14:
                err_2 = _h.sent();
                console.error("Failed to create service files directory for " + serviceConfig.name + " at " + localDirPath + ": " + err_2);
                return [3 /*break*/, 15];
            case 15:
                _i++;
                return [3 /*break*/, 10];
            case 16: return [3 /*break*/, 3];
            case 17: return [3 /*break*/, 24];
            case 18:
                e_3_1 = _h.sent();
                e_3 = { error: e_3_1 };
                return [3 /*break*/, 24];
            case 19:
                _h.trys.push([19, , 22, 23]);
                if (!(_d && !_d.done && (_g = _c.return))) return [3 /*break*/, 21];
                return [4 /*yield*/, _g.call(_c)];
            case 20:
                _h.sent();
                _h.label = 21;
            case 21: return [3 /*break*/, 23];
            case 22:
                if (e_3) throw e_3.error;
                return [7 /*endfinally*/];
            case 23: return [7 /*endfinally*/];
            case 24: return [4 /*yield*/, fetchCreds()];
            case 25:
                _f = _h.sent(), base = _f[2];
                return [4 /*yield*/, publicRoot()];
            case 26:
                publicRootPath = _h.sent();
                restspaceJson = JSON.stringify({ base: base });
                if (!!publicRootPath) return [3 /*break*/, 27];
                console.warn('Failed to find public html root');
                console.log("Ensure a file exists at /restspace.json containing: " + restspaceJson);
                return [3 /*break*/, 29];
            case 27:
                restspaceJsonPath = path.join(publicRootPath, 'restspace.json');
                return [4 /*yield*/, fs.writeFile(restspaceJsonPath, restspaceJson)];
            case 28:
                _h.sent();
                console.log("Written config file to be read from /restspace.json to " + restspaceJsonPath);
                _h.label = 29;
            case 29:
                services = {
                    chords: chords
                };
                servicesJsonPath = path.join(absDirPath, 'services.json');
                return [4 /*yield*/, fs.writeFile(servicesJsonPath, JSON.stringify(services))];
            case 30:
                _h.sent();
                console.log("Written service configuration at " + servicesJsonPath);
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVBY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9nZW5lcmF0ZUFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM3QixPQUFPLElBQUksTUFBTSxNQUFNLENBQUM7QUFDeEIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFLL0QsU0FBZ0IsT0FBTyxDQUFDLE9BQWUsRUFBRSxJQUFjOzs7Ozs7d0JBQ3RDLDZCQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUE7O29CQUE1RCxPQUFPLEdBQUcsU0FBa0Q7b0JBQzFELElBQUksR0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUF4QixDQUF5QjswQkFDWixFQUFQLG1CQUFPOzs7eUJBQVAsQ0FBQSxxQkFBTyxDQUFBO29CQUFkLEdBQUc7b0JBQ1AsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDNUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFqQix5QkFBaUI7b0JBQ2QsT0FBTyxHQUFHLElBQUksS0FBSyxhQUFhLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxjQUFjLENBQUM7eUJBRWxFLE9BQU8sRUFBUCx5QkFBTztvQkFDTixRQUFRLEdBQUcsYUFBeUIsQ0FBQztvQkFDekMsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLGNBQWM7d0JBQUUsUUFBUSxHQUFHLGNBQWMsQ0FBQzt5QkFDdEQsSUFBSSxHQUFH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