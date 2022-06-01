"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User = require("../models/User");
var _a = require('express-validator'), validationResult = _a.validationResult, Result = _a.Result;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.register = function (req, res) {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }
    var newUser = new User(req.body);
    newUser.save(function (err, user) {
        if (err)
            return res.status(400).json({ "Message": "Email already registered with another account!" });
        else {
            var authtoken = jsonwebtoken_1.default.sign({ _id: user._id, role: user.role }, process.env.SECRET);
            res.cookie("token", authtoken, { expiresIn: 60 * 60 * 9999 });
            var _id = user._id, name_1 = user.name, email = user.email;
            return res.status(200).json({ authtoken: authtoken, user: { _id: _id, name: name_1, email: email } });
        }
    });
};
exports.login = function (req, res) {
    var errors = validationResult(req);
    var _a = req.body, email = _a.email, password = _a.password;
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }
    User.findOne({ email: email }, function (err, user) {
        if (err)
            return res.status(500).json({ "Error": err });
        else if (!user)
            return res.status(400).json({ "Message": "User with this email not found!" });
        else {
            if (!user.authenticate(password)) {
                return res.status(400).json({ "Message": "Email and password does not match!" });
            }
            var authtoken = jsonwebtoken_1.default.sign({ _id: user._id, role: user.role }, process.env.SECRET);
            res.cookie("token", authtoken, { expiresIn: 60 * 60 * 9999 });
            var _id = user._id, name_2 = user.name, email_1 = user.email;
            return res.status(200).json({ authtoken: authtoken, user: { _id: _id, name: name_2, email: email_1 } });
        }
    });
};
exports.logout = function (req, res) {
    res.clearCookie("token");
    res.json({
        message: "User signed out successfully"
    });
};
