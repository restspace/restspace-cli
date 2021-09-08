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
import inquirer from "inquirer";
import path from "path";
import os from "os";
import fs from "fs/promises";
import { exit } from "process";
import { readConfig } from "./fetchCreds";
export var getConfigPath = function () {
    var configDir = path.join(os.homedir(), "restspace");
    var configPath = path.join(configDir, "config.json");
    return [configDir, configPath];
};
export var instanceAction = function (host, emailLine, passwordLine) { return __awaiter(void 0, void 0, void 0, function () {
    var config_1, _a, email, password, _b, configDir, configPath, exists, config, configStr, err_1, err_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!(host === "list")) return [3 /*break*/, 2];
                return [4 /*yield*/, readConfig()];
            case 1:
                config_1 = _c.sent();
                Object.entries(config_1).forEach(function (_a) {
                    var host = _a[0], conf = _a[1];
                    return console.log(host + ": " + conf.email);
                });
                return [2 /*return*/];
            case 2: return [4 /*yield*/, inquirer.prompt([
                    { name: "email", message: "Account email" },
                    { type: "password", name: "password", message: "Account password" }
                ], {
                    email: emailLine,
                    password: passwordLine
                })];
            case 3:
                _a = _c.sent(), email = _a.email, password = _a.password;
                _b = getConfigPath(), configDir = _b[0], configPath = _b[1];
                exists = true;
                return [4 /*yield*/, fs.access(configPath).catch(function () { return exists = false; })];
            case 4:
                _c.sent();
                config = {};
                if (!exists) return [3 /*break*/, 9];
                _c.label = 5;
            case 5:
                _c.trys.push([5, 7, , 8]);
                return [4 /*yield*/, fs.readFile(configPath, { encoding: "utf8" })];
            case 6:
                configStr = _c.sent();
                config = JSON.parse(configStr);
                return [3 /*break*/, 8];
            case 7:
                err_1 = _c.sent();
                console.error("Failed reading existing config at " + configPath + ": " + err_1);
                exit(1);
                return [3 /*break*/, 8];
            case 8: return [3 /*break*/, 12];
            case 9:
                exists = true;
                return [4 /*yield*/, fs.access(configDir).catch(function () { return exists = false; })];
            case 10:
                _c.sent();
                if (!!exists) return [3 /*break*/, 12];
                return [4 /*yield*/, fs.mkdir(configDir)];
            case 11:
                _c.sent();
                _c.label = 12;
            case 12:
                config[host] = { email: email, password: password };
                _c.label = 13;
            case 13:
                _c.trys.push([13, 15, , 16]);
                return [4 /*yield*/, fs.writeFile(configPath, JSON.stringify(config))];
            case 14:
                _c.sent();
                return [3 /*break*/, 16];
            case 15:
                err_2 = _c.sent();
                console.error("Failed to write config to " + configPath + ": " + err_2);
                exit(1);
                return [3 /*break*/, 16];
            case 16:
                console.log("Config written to " + configPath);
                return [2 /*return*/];
        }
    });
}); };
