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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import fetch from "node-fetch";
import { login } from "./api";
import fs from "fs/promises";
import path from "path";
import { applicationRoot } from "./files";
import { resolvePathPattern } from "./resolvePathPattern";
import inquirer from "inquirer";
var syncLocalDir = function (absDirPath, urlBase, chord, headers) { return __awaiter(void 0, void 0, void 0, function () {
    var localDirPath, remoteUrl, resp, remoteList, localList, _i, localList_1, localFile, remoteServicePath, remoteUrlPath, fileStr, err_1, remoteItemIdx, _a, remoteList_1, removeRemoteUrl, message, canDelete, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!chord.localDir)
                    return [2 /*return*/];
                localDirPath = path.join.apply(path, __spreadArrays([absDirPath, 'serviceFiles'], chord.localDir.path.split('/')));
                remoteUrl = urlBase + "/" + chord.basePath;
                return [4 /*yield*/, fetch(remoteUrl + '/$list=recursive')];
            case 1:
                resp = _b.sent();
                return [4 /*yield*/, resp.json()];
            case 2:
                remoteList = (_b.sent());
                return [4 /*yield*/, fs.readdir(localDirPath)];
            case 3:
                localList = _b.sent();
                _i = 0, localList_1 = localList;
                _b.label = 4;
            case 4:
                if (!(_i < localList_1.length)) return [3 /*break*/, 11];
                localFile = localList_1[_i];
                remoteServicePath = localFile;
                remoteUrlPath = remoteUrl + "/" + remoteServicePath;
                _b.label = 5;
            case 5:
                _b.trys.push([5, 8, , 9]);
                if (chord.localDir.pathUrlMap) {
                    remoteServicePath = resolvePathPattern(chord.localDir.pathUrlMap, localFile);
                    remoteUrlPath = remoteUrl + "/" + remoteServicePath;
                }
                return [4 /*yield*/, fs.readFile(path.join(localDirPath, localFile))];
            case 6:
                fileStr = _b.sent();
                return [4 /*yield*/, fetch(remoteUrlPath, {
                        method: 'PUT',
                        headers: headers,
                        body: fileStr
                    })];
            case 7:
                resp = _b.sent();
                if (!resp.ok)
                    throw new Error("HTTP send failed: " + resp.status + " " + resp.statusText);
                return [3 /*break*/, 9];
            case 8:
                err_1 = _b.sent();
                console.error("Failed to send file " + remoteUrlPath + ": " + err_1);
                return [3 /*break*/, 9];
            case 9:
                remoteItemIdx = remoteList.indexOf(remoteUrlPath);
                remoteList.splice(remoteItemIdx, 1);
                _b.label = 10;
            case 10:
                _i++;
                return [3 /*break*/, 4];
            case 11:
                _a = 0, remoteList_1 = remoteList;
                _b.label = 12;
            case 12:
                if (!(_a < remoteList_1.length)) return [3 /*break*/, 18];
                removeRemoteUrl = remoteList_1[_a];
                message = "Confirm deletion of remote file at " + removeRemoteUrl;
                return [4 /*yield*/, inquirer
                        .prompt({ type: "confirm", name: "canDelete", message: message })];
            case 13:
                canDelete = (_b.sent()).canDelete;
                if (!canDelete) return [3 /*break*/, 17];
                _b.label = 14;
            case 14:
                _b.trys.push([14, 16, , 17]);
                return [4 /*yield*/, fetch(removeRemoteUrl, {
                        method: 'DELETE',
                        headers: headers
                    })];
            case 15:
                resp = _b.sent();
                return [3 /*break*/, 17];
            case 16:
                err_2 = _b.sent();
                console.error("Failed to delete: " + err_2);
                return [3 /*break*/, 17];
            case 17:
                _a++;
                return [3 /*break*/, 12];
            case 18: return [2 /*return*/];
        }
    });
}); };
export var sendAction = function () { return __awaiter(void 0, void 0, void 0, function () {
    var absDirPath, servicesStr, services, _a, token, base, headers, putChords, _i, _b, chord;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, applicationRoot()];
            case 1:
                absDirPath = _c.sent();
                return [4 /*yield*/, fs.readFile(path.join(absDirPath, "services.json"))];
            case 2:
                servicesStr = _c.sent();
                services = JSON.parse(servicesStr.toString());
                return [4 /*yield*/, login()];
            case 3:
                _a = _c.sent(), token = _a[0], base = _a[1];
                console.log(services);
                headers = {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                };
                return [4 /*yield*/, fetch(base + '.well-known/restspace/chords', {
                        method: 'PUT',
                        headers: headers,
                        body: JSON.stringify(services.chords)
                    })];
            case 4:
                putChords = _c.sent();
                if (!putChords.ok) {
                    console.error("Failed to send, result was " + putChords.status + " " + putChords.statusText);
                }
                else {
                    console.log("Sent services to " + base);
                }
                _i = 0, _b = services.chords;
                _c.label = 5;
            case 5:
                if (!(_i < _b.length)) return [3 /*break*/, 8];
                chord = _b[_i];
                return [4 /*yield*/, syncLocalDir(absDirPath, base, chord, headers)];
            case 6:
                _c.sent();
                _c.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 5];
            case 8: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZEFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NlbmRBY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLE9BQU8sS0FBSyxNQUFNLFlBQVksQ0FBQztBQUMvQixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQzlCLE9BQU8sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM3QixPQUFPLElBQUksTUFBTSxNQUFNLENBQUM7QUFDeEIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUUxQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRCxPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFFaEMsSUFBTSxZQUFZLEdBQUcsVUFBTyxVQUFrQixFQUFFLE9BQWUsRUFBRSxLQUEwQixFQUFFLE9BQStCOzs7OztnQkFDM0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO29CQUFFLHNCQUFPO2dCQUN0QixZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksT0FBVCxJQUFJLGtCQUFNLFVBQVUsRUFBRSxjQUFjLEdBQUssS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUM7Z0JBQ3hGLFNBQVMsR0FBTSxPQUFPLFNBQUksS0FBSyxDQUFDLFFBQVUsQ0FBQztnQkFFdEMscUJBQU0sS0FBSyxDQUFDLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxFQUFBOztnQkFBbEQsSUFBSSxHQUFHLFNBQTJDO2dCQUNsQyxxQkFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUE7O2dCQUEvQixVQUFVLEdBQUcsQ0FBQyxTQUFpQixDQUFhO2dCQUNoQyxxQkFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFBOztnQkFBMUMsU0FBUyxHQUFHLFNB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