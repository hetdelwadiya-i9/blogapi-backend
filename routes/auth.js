"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var _a = require("../controllers/auth"), register = _a.register, login = _a.login, logout = _a.logout;
var check = require('express-validator').check;
router.post("/register", [
    check('name').isLength({ min: 5 }).withMessage('Name must be at least 5 characters long!'),
    check('email').isEmail().withMessage('Enter valid email!'),
    check('password').isLength({ min: 5 }).withMessage('Password must be at least 5 chars long!')
], register);
router.post("/login", [
    check('email').isEmail().withMessage('Enter valid email!'),
    check('password').isLength({ min: 5 }).withMessage('Password must contain more than 5 letters!')
], login);
router.get("/logout", logout);
module.exports = router;
