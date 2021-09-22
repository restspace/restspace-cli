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
import { getConfigPath } from "./instanceAction";
import fs from "fs/promises";
import { exit } from "process";
export var readConfig = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, configDir, configPath, config, configStr, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = getConfigPath(), configDir = _a[0], configPath = _a[1];
                config = {};
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fs.readFile(configPath, { encoding: "utf8" })];
            case 2:
                configStr = _b.sent();
                config = JSON.parse(configStr);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                console.error("Failed reading existing config at " + configPath + ": " + err_1);
                exit(1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, config];
        }
    });
}); };
export var fetchCreds = function (host) { return __awaiter(void 0, void 0, void 0, function () {
    var config, creds, scheme, base;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, readConfig()];
            case 1:
                config = _a.sent();
                if (Object.keys(config).length === 0) {
                    console.error('No instances have been configured yet: please configure one using the command: restspace configure');
                    exit(1);
                }
                if (Object.keys(config).length > 1) {
                    if (!host) {
                        console.error('You have multiple Restspace instances configured, please give the host name');
                        exit(1);
                    }
                    creds = config[host];
                    if (!creds) {
                        console.error("Host " + host + " has no configuration information saved using the command: restspace instance");
                    }
                }
                else {
                    host = Object.keys(config)[0];
                    creds = config[host];
                }
                scheme = host.startsWith('localhost') ? 'http' : 'https';
                base = scheme + "://" + host + "/";
                return [2 /*return*/, [host, creds, base]];
        }
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2hDcmVkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2ZldGNoQ3JlZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFTLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM3QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRS9CLE1BQU0sQ0FBQyxJQUFNLFVBQVUsR0FBRzs7Ozs7Z0JBQ25CLEtBQTRCLGFBQWEsRUFBRSxFQUF6QyxTQUFTLFFBQUEsRUFBRSxVQUFVLFFBQUEsQ0FBcUI7Z0JBRTlDLE1BQU0sR0FBMEIsRUFBRSxDQUFDOzs7O2dCQUVwQixxQkFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFBOztnQkFBL0QsU0FBUyxHQUFHLFNBQW1EO2dCQUNyRSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQzs7OztnQkFFL0IsT0FBTyxDQUFDLEtBQUssQ0FBQyx1Q0FBcUMsVUFBVSxVQUFLLEtBQUssQ0FBQyxDQUFDO2dCQUN6RSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7O29CQUdULHNCQUFPLE1BQU0sRUFBQzs7O0tBQ2QsQ0FBQTtBQUVELE1BQU0sQ0FBQyxJQUFNLFVBQVUsR0FBRyxVQUFPLElBQWE7Ozs7b0JBQzlCLHFCQUFNLFVBQVUsRUFBRSxFQUFBOztnQkFBM0IsTUFBTSxHQUFHLFNBQWtCO2dCQUdqQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDckMsT0FBTyxDQUFDLEtBQUssQ0FBQyxvR0FBb0csQ0FBQyxDQUFDO29CQUNwSCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ1I7Z0JBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxJQUFJLEVBQUU7d0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyw2RUFBNkUsQ0FBQyxDQUFDO3dCQUM3RixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ1I7b0JBQ0QsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDckIsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDWCxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVEsSUFBSSxrRkFBK0UsQ0FBQyxDQUFDO3FCQUMzRztpQkFDRDtxQkFBTTtvQkFDTixJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDckI7Z0JBRUcsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUN2RCxJQUFJLEdBQU0sTUFBTSxXQUFNLElBQUksTUFBRyxDQUFDO2dCQUVwQyxzQkFBTyxDQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFFLEVBQUM7OztLQUM3QixDQUFBIn0=