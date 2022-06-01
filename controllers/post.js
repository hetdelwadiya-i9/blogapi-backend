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
Object.defineProperty(exports, "__esModule", { value: true });
var User = require("../models/User");
var Post = require("../models/Post");
var Draft = require("../models/Draft");
exports.getPostById = function (req, res, next, id) {
    Post.findById(id)
        .populate("user", "name email")
        .exec(function (err, post) {
        if (err)
            return res.status(400).json({ error: err });
        else if (!post)
            return res.status(400).json({ Message: "Post not found!" });
        else {
            req.post = post;
            next();
        }
    });
};
exports.getPost = function (req, res) {
    return res.status(200).json(req.post);
};
exports.getTotalPages = function (req, res) {
    Post.count({}, function (err, count) {
        if (err)
            return res.status(500).json({ error: "Failed to fetch posts from database!" });
        return res.status(200).json(count);
    });
};
exports.getPosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        //expect pageNumber and pageSize (posts/Page) from frontend
        Post.find({ isApproved: true })
            .sort({ createdAt: -1 })
            .populate("user", "name email")
            .skip((req.body.pageNumber - 1) * req.body.pageSize)
            .limit(req.body.pageSize)
            .exec(function (err, posts) {
            if (err)
                return res.status(500).json({ error: "Failed to fetch posts from database!" });
            return res.status(200).json(posts);
        });
        return [2 /*return*/];
    });
}); };
exports.getPostsByName = function (req, res) {
    //expect pageNumber and pageSize (posts/Page) and post title from frontend
    var totalPosts = 0;
    Post.count({ postTitle: { '$regex': req.body.postTitle, $options: 'i' }, isApproved: true })
        .exec(function (err, count) {
        if (err)
            return res.status(500).json({ error: "Failed to fetch posts from database!" });
        totalPosts = count;
    });
    Post.find({ postTitle: { '$regex': req.body.postTitle, $options: 'i' }, isApproved: true })
        .populate("user", "name email")
        .skip((req.body.pageNumber - 1) * req.body.pageSize)
        .limit(req.body.pageSize)
        .exec(function (err, posts) {
        if (err)
            return res.status(500).json({ error: "Failed to fetch posts from database!" });
        return res.status(200).json({ totalPosts: totalPosts, posts: posts });
    });
};
exports.createPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.body.postData == "" || req.body.postTitle == "" || req.body.user == "" || req.body.postShortDescription == "") {
                    return [2 /*return*/, res.status(400).json({ error: "Please provide all required details!" })];
                }
                post = new Post({
                    postTitle: req.body.postTitle,
                    postData: req.body.postData,
                    postShortDescription: req.body.postShortDescription,
                    user: req.body.user,
                    isApproved: false
                });
                return [4 /*yield*/, post.save()];
            case 1:
                result = _a.sent();
                User.findByIdAndUpdate({ _id: req.body.user }, { $push: { posts: result._id } }, { new: true }, function (err, user) {
                    if (err)
                        return res.status(500).json({ error: "Failed to add new post in user's database!" });
                });
                return [2 /*return*/, res.status(200).json(result)];
        }
    });
}); };
exports.updatePost = function (req, res) {
    if (req.body.postData == "" || req.body.postTitle == "" || req.body.postShortDescription == "") {
        return res.status(400).json({ error: "Please provide all required details!" });
    }
    Post.findByIdAndUpdate({ _id: req.post._id }, { $set: req.body }, { new: true }, function (err, post) {
        if (err)
            return res.status(500).json({ error: "Failed to update post in database!" });
        return res.status(200).json(post);
    });
};
exports.deletePost = function (req, res) {
    Post.findByIdAndDelete(req.post._id, function (err, post) {
        if (err)
            return res.status(500).json({ error: "Failed to delete post from database!" });
        User.findByIdAndUpdate({ _id: post.user }, { $pull: { posts: req.post._id } }, { new: true }, function (err, user) {
            if (err)
                return res.status(500).json({ error: "Failed to update user's post array in database!" });
        });
    });
    return res.status(200).json({ "Message": "Post deleted successfully" });
};
exports.addComment = function (req, res) {
    if (req.body.commentId == "" || req.body.commentUser == "" || req.body.commentText == "" || req.body.commentUserName == "") {
        return res.status(400).json({ error: "Please provide all required details!" });
    }
    Post.findByIdAndUpdate({ _id: req.post._id }, { $push: { comments: req.body } }, { new: true }, function (err, post) {
        if (err)
            return res.status(500).json({ error: "Failed to add comment in database!" });
        return res.status(200).json(post);
    });
};
exports.deleteComment = function (req, res) {
    if (req.body.commentId == "") {
        return res.status(400).json({ error: "Please provide comment id!" });
    }
    Post.findByIdAndUpdate({ _id: req.post._id }, { $pull: { comments: { commentId: req.body.commentId } } }, { new: true }, function (err, post) {
        if (err)
            return res.status(500).json({ error: "Failed to delete comment from database!" });
        return res.status(200).json(post);
    });
};
