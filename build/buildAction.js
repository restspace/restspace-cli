"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAction = void 0;
var process_1 = require("process");
var fetchCreds_1 = require("./fetchCreds");
var node_fetch_1 = __importDefault(require("node-fetch"));
exports.buildAction = function (hostArg) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, host, creds, scheme, base, res, cookie, token, services;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, fetchCreds_1.fetchCreds(hostArg)];
            case 1:
                _a = _c.sent(), host = _a[0], creds = _a[1];
                scheme = host.startsWith('localhost') ? 'http' : 'https';
                base = scheme + "://" + host + "/";
                return [4 /*yield*/, node_fetch_1.default(base + 'auth/login', {
                        method: 'POST',
                        body: JSON.stringify({
                            email: creds.email,
                            password: creds.password
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })];
            case 2:
                res = _c.sent();
                if (!res.ok) {
                    switch (res.status) {
                        case 404:
                            console.error('Login to instance failed: no such user');
                            break;
                        case 400:
                            console.error('Login to instance failed: bad password');
                            break;
                    }
                    process_1.exit(1);
                }
                cookie = res.headers.get('set-cookie');
                token = '';
                try {
                    token = ((_b = cookie === null || cookie === void 0 ? void 0 : cookie.split(';').find(function (part) { return part.startsWith('rs-auth='); })) === null || _b === void 0 ? void 0 : _b.split('=')[1]) || '';
                }
                catch (_d) { }
                if (!token) {
                    console.error('Login failed to return correct creds cookie');
                    process_1.exit(1);
                }
                return [4 /*yield*/, node_fetch_1.default(base + '.well-known/restspace/services', {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    })];
            case 3:
                res = _c.sent();
                return [4 /*yield*/, res.json()];
            case 4:
                services = _c.sent();
                console.log(services);
                return [2 /*return*/];
        }
    });
}); };
