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
var Post_1 = __importDefault(require("../models/Post"));
var User_1 = __importDefault(require("../models/User"));
exports.getAdminById = function (req, res, next, id) {
    User_1.default.findById(id)
        .populate("posts", "postTitle postData isApproved comments postShortDescription")
        .populate("drafts", "postTitle postData draftShortDescription")
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
exports.getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_1.default.find({ role: 0 })
                    .sort({ createdAt: -1 })
                    .skip((req.body.pageNumber - 1) * req.body.pageSize)
                    .limit(req.body.pageSize)];
            case 1:
                users = _a.sent();
                if (users.length > 0)
                    return [2 /*return*/, res.status(200).json(users)];
                return [2 /*return*/, res.status(200).json({ "Message": "No users found!" })];
        }
    });
}); };
exports.getUser = function (req, res) {
    User_1.default.findById(req.params.userId)
        .populate("posts", "postTitle postData isApproved comments postShortDescription")
        .populate("drafts", "draftTitle draftData draftShortDescription")
        .exec(function (err, user) {
        if (err)
            return res.status(400).json({ error: err });
        else if (!user)
            return res.json({ Message: "User not found!" });
        else {
            return res.json(user);
        }
    });
};
exports.getTotalUserPages = function (req, res) {
    User_1.default.count({ role: 0 }, function (err, count) {
        if (err)
            return res.status(500).json({ error: "Failed to fetch users from database!" });
        return res.status(200).json(count);
    });
};
exports.getNonApprovedPosts = function (req, res) {
    //expect pageNumber and pageSize (posts/Page) from frontend
    Post_1.default.find({ isApproved: false })
        .sort({ createdAt: -1 })
        .populate("user", "name email")
        .skip((req.body.pageNumber - 1) * req.body.pageSize)
        .limit(req.body.pageSize)
        .exec(function (err, posts) {
        if (err)
            return res.status(500).json({ error: "Failed to fetch post from database!" });
        return res.status(200).json(posts);
    });
};
exports.getTotalNonApprovedPostPages = function (req, res) {
    Post_1.default.count({ isApproved: false }, function (err, count) {
        if (err)
            return res.status(500).json({ error: "Failed to fetch posts from database!" });
        return res.status(200).json(count);
    });
};
exports.getTotalApprovedPostPages = function (req, res) {
    Post_1.default.count({ isApproved: true }, function (err, count) {
        if (err)
            return res.status(500).json({ error: "Failed to fetch posts from database!" });
        return res.status(200).json(count);
    });
};
exports.getApprovedPosts = function (req, res) {
    //expect pageNumber and pageSize (posts/Page) from frontend
    Post_1.default.find({ isApproved: true })
        .sort({ createdAt: -1 })
        .populate("user", "name email")
        .skip((req.body.pageNumber - 1) * req.body.pageSize)
        .limit(req.body.pageSize)
        .exec(function (err, posts) {
        if (err)
            return res.status(500).json({ error: "Failed to fetch post from database!" });
        return res.status(200).json(posts);
    });
};
exports.approvePost = function (req, res) {
    Post_1.default.findByIdAndUpdate({ _id: req.post._id }, { $set: { isApproved: true } }, { new: true }, function (err, post) {
        if (err)
            return res.status(500).json({ error: "Failed to update post in database!" });
        return res.status(200).json(post);
    });
};
exports.removeUser = function (req, res) {
    User_1.default.findByIdAndDelete(req.params.userId, function (err, user) {
        if (err)
            return res.status(500).json({ error: "Failed to delete user from database!" });
        Post_1.default.deleteMany({ user: user._id })
            .exec(function (err, posts) {
            if (err)
                return res.status(500).json({ error: "Failed to delete posts of user from database!" });
        });
    });
    return res.status(200).json({ "Message": "User deleted successfully with all user's data" });
};
exports.removePost = function (req, res) {
    Post_1.default.findByIdAndDelete(req.post._id, function (err, post) {
        if (err)
            return res.status(500).json({ error: "Failed to delete post from database!" });
        User_1.default.findByIdAndUpdate({ _id: post.user }, { $pull: { posts: req.post._id } }, { new: true }, function (err, user) {
            if (err)
                return res.status(500).json({ error: "Failed to update user's post array in database!" });
        });
    });
    return res.status(200).json({ "Message": "Post deleted successfully" });
};