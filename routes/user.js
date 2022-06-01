"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var _a = require("../controllers/user"), getUserById = _a.getUserById, getUser = _a.getUser, updateUser = _a.updateUser, deleteUser = _a.deleteUser;
var _b = require("../middlewares/auth"), isAuthenticated = _b.isAuthenticated, isSignedIn = _b.isSignedIn;
router.param("userId", getUserById);
//read
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
//update
router.put("/user/:userId/update", isSignedIn, isAuthenticated, updateUser);
//delete
router.delete("/user/:userId/delete", isSignedIn, isAuthenticated, deleteUser);
module.exports = router;
