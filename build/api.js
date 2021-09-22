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
import { exit } from "process";
import { fetchCreds } from "./fetchCreds";
import fetch from "node-fetch";
export var login = function (hostArg) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, host, creds, base, res, cookie, token;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, fetchCreds(hostArg)];
            case 1:
                _a = _c.sent(), host = _a[0], creds = _a[1], base = _a[2];
                return [4 /*yield*/, fetch(base + 'auth/login', {
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
                    exit(1);
                }
                cookie = res.headers.get('set-cookie');
                token = '';
                try {
                    token = ((_b = cookie === null || cookie === void 0 ? void 0 : cookie.split(';').find(function (part) { return part.startsWith('rs-auth='); })) === null || _b === void 0 ? void 0 : _b.split('=')[1]) || '';
                }
                catch (_d) { }
                if (!token) {
                    console.error('Login failed to return correct creds cookie');
                    exit(1);
                }
                return [2 /*return*/, [token, base]];
        }
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDL0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEtBQUssTUFBTSxZQUFZLENBQUM7QUFFL0IsTUFBTSxDQUFDLElBQU0sS0FBSyxHQUFHLFVBQU8sT0FBZ0I7Ozs7O29CQUNmLHFCQUFNLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBQTs7Z0JBQS9DLEtBQXNCLFNBQXlCLEVBQTlDLElBQUksUUFBQSxFQUFFLEtBQUssUUFBQSxFQUFFLElBQUksUUFBQTtnQkFFZCxxQkFBTSxLQUFLLENBQUMsSUFBSSxHQUFHLFlBQVksRUFBRTt3QkFDMUMsTUFBTSxFQUFFLE1BQU07d0JBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7NEJBQ3BCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSzs0QkFDbEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO3lCQUN4QixDQUFDO3dCQUNGLE9BQU8sRUFBRTs0QkFDUixjQUFjLEVBQUUsa0JBQWtCO3lCQUNsQztxQkFDRCxDQUFDLEVBQUE7O2dCQVRFLEdBQUcsR0FBRyxTQVNSO2dCQUVGLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFO29CQUNaLFFBQVEsR0FBRyxDQUFDLE1BQU0sRUFBRTt3QkFDbkIsS0FBSyxHQUFHOzRCQUNQLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQzs0QkFDeEQsTUFBTTt3QkFDUCxLQUFLLEdBQUc7NEJBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDOzRCQUN4RCxNQUFNO3FCQUNQO29CQUNELElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDUjtnQkFFSyxNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3pDLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ2YsSUFBSTtvQkFDSCxLQUFLLEdBQUcsT0FBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUEzQixDQUEyQiwyQ0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBSyxFQUFFLENBQUM7aUJBQzFGO2dCQUFDLFdBQU0sR0FBSTtnQkFFWixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztvQkFDN0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNSO2dCQUVELHNCQUFPLENBQUUsS0FBSyxFQUFFLElBQUksQ0FBRSxFQUFDOzs7S0FDdkIsQ0FBQSJ9