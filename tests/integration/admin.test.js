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
var request = require("supertest");
var User_1 = __importDefault(require("../../models/User"));
var server;
var token, adminId;
describe("POST: ", function () {
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, u;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    server = require("../../app");
                    user = {
                        name: "het is admin",
                        email: "het@admin.com",
                        password: "123456",
                        role: 33
                    };
                    return [4 /*yield*/, request(server).post("/api/register").send(user)];
                case 1:
                    u = _a.sent();
                    token = u.body.authtoken;
                    adminId = u.body.user._id;
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server.close()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, User_1.default.deleteMany({})];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe("POST /api/admin/:adminId/users", function () {
        it("should return error if authtoken is not valid!", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(server).get("/api/admin/".concat(adminId, "/users"))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return list of users if request is valid!", function () { return __awaiter(void 0, void 0, void 0, function () {
            var nUser, nUserInDB, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nUser = {
                            name: "dummy user",
                            email: "het@het.com",
                            password: "123456"
                        };
                        return [4 /*yield*/, request(server).post("/api/register").send(nUser)];
                    case 1:
                        nUserInDB = _a.sent();
                        return [4 /*yield*/, request(server).get("/api/admin/".concat(adminId, "/users")).set("Authorization", "Bearer ".concat(token))];
                    case 2:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.length).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
