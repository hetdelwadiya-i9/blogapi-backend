"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __importDefault(require("../models/User"));
var crypto_1 = __importDefault(require("crypto"));
var uuidv1 = require("uuid").v1;
exports.getUserById = function (req, res, next, id) {
    User_1.default.findById(id)
        .populate("posts", "postTitle postData isApproved comments postShortDescription")
        .populate("drafts", "draftTitle draftData draftShortDescription")
        .exec(function (err, user) {
        if (err)
            return res.status(400).json({ error: err });
        else if (!user)
            return res.json({ Message: "User not found!" });
        else {
            user.encry_password = undefined;
            user.salt = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            req.profile = user;
            next();
        }
    });
};
exports.getUser = function (req, res) {
    return res.json(req.profile);
};
exports.updateUser = function (req, res) {
    var data;
    if (req.body.password) {
        data = {
            name: req.body.name,
            email: req.body.email,
            salt: uuidv1(),
            encry_password: req.body.password,
        };
        data.encry_password = crypto_1.default
            .createHmac('sha256', data.salt)
            .update(req.body.password)
            .digest('hex');
    }
    else {
        data = {
            name: req.body.name,
            email: req.body.email
        };
    }
    User_1.default.findByIdAndUpdate({ _id: req.profile._id }, { $set: data }, { new: true }, function (err, user) {
        if (err)
            return res.status(500).json({ error: "Failed to update user in database!" });
        user.encry_password = undefined;
        user.salt = undefined;
        user.createdAt = undefined;
        user.updatedAt = undefined;
        return res.status(200).json(user);
    });
};
exports.deleteUser = function (req, res) {
    User_1.default.findByIdAndDelete(req.profile._id)
        .exec(function (err, user) {
        if (err)
            return res.status(500).json({ error: "Failed to delete user from database!" });
        return res.status(200).json({ "Message": "User data deleted successfully from database!" });
    });
};
