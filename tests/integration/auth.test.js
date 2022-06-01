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
var auth = require("../../controllers/auth");
var request = require("supertest");
var User_1 = __importDefault(require("../../models/User"));
var server, data;
describe("Auth: ", function () {
    beforeEach(function () {
        server = require("../../app");
        data = {
            name: "het123",
            email: "het@test.com",
            password: "123456"
        };
    });
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
    describe("POST /api/register", function () {
        it("should return error if name is not valid!", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data.name = "";
                        return [4 /*yield*/, request(server).post("/api/register").send(data)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(400);
                        expect(res.body.error).toMatch(/.*name.*/i);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error if email is not valid!", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data.email = "";
                        return [4 /*yield*/, request(server).post("/api/register").send(data)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(400);
                        expect(res.body.error).toMatch(/.*email.*/i);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error if password is not valid!", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data.password = "";
                        return [4 /*yield*/, request(server).post("/api/register").send(data)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(400);
                        expect(res.body.error).toMatch(/.*password.*/i);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return authtoken and user details in object if request is valid!", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, res, userInDB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new User_1.default(data);
                        return [4 /*yield*/, request(server).post("/api/register").send(data)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body).toHaveProperty("authtoken");
                        expect(res.body).toHaveProperty("user");
                        return [4 /*yield*/, User_1.default.findById(res.body.user._id)];
                    case 2:
                        userInDB = _a.sent();
                        expect(userInDB._id.toHexString()).toBe(res.body.user._id);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("POST /api/login", function () {
        it("should return error if email is not provided!", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data.name = "";
                        data.email = "";
                        return [4 /*yield*/, request(server).post("/api/login").send(data)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(400);
                        expect(res.body.error).toMatch(/.*email.*/i);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error if password is not provided!", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data.name = "";
                        data.password = "";
                        return [4 /*yield*/, request(server).post("/api/login").send(data)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(400);
                        expect(res.body.error).toMatch(/.*password.*/i);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error if email is not registered!", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data.name = "";
                        data.email = "thisemailnotregistered@gmail.com";
                        return [4 /*yield*/, request(server).post("/api/login").send(data)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(400);
                        expect(res.body.Message).toMatch(/.*email.*/i);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error if password is wrong!", function () { return __awaiter(void 0, void 0, void 0, function () {
            var saveUser, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(server).post("/api/register").send(data)];
                    case 1:
                        saveUser = _a.sent();
                        expect(saveUser.status).toBe(200);
                        data.name = "";
                        data.password = "wrongpass";
                        return [4 /*yield*/, request(server).post("/api/login").send(data)];
                    case 2:
                        res = _a.sent();
                        expect(res.status).toBe(400);
                        expect(res.body.Message).toMatch(/.*password.*/i);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return authtoken and user details in object if request is valid!", function () { return __awaiter(void 0, void 0, void 0, function () {
            var saveUser, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(server).post("/api/register").send(data)];
                    case 1:
                        saveUser = _a.sent();
                        expect(saveUser.status).toBe(200);
                        data.name = "";
                        return [4 /*yield*/, request(server).post("/api/login").send(data)];
                    case 2:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body).toHaveProperty("authtoken");
                        expect(res.body).toHaveProperty("user");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("GET /api/logout", function () {
        it("should return 200 if its a valid request!", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(server).get("/api/logout")];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
