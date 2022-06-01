"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var _a = require("../controllers/post"), createPost = _a.createPost, getPosts = _a.getPosts, getPost = _a.getPost, getTotalPages = _a.getTotalPages, getPostsByName = _a.getPostsByName, updatePost = _a.updatePost, getPostById = _a.getPostById, deletePost = _a.deletePost, addComment = _a.addComment, deleteComment = _a.deleteComment;
var getUserById = require("../controllers/user").getUserById;
var _b = require("../middlewares/auth"), isAuthenticated = _b.isAuthenticated, isSignedIn = _b.isSignedIn;
router.param("userId", getUserById);
router.param("postId", getPostById);
//create
router.post("/user/:userId/post/create", isSignedIn, isAuthenticated, createPost);
//read
router.get("/post/:postId", getPost);
router.get("/posts/pages", getTotalPages);
router.post("/posts", getPosts);
router.post("/posts/by/name", getPostsByName);
//update
router.put("/user/:userId/post/:postId/update", isSignedIn, isAuthenticated, updatePost);
router.put("/user/:userId/post/:postId/comment/add", isSignedIn, isAuthenticated, addComment);
router.put("/user/:userId/post/:postId/comment/remove", isSignedIn, isAuthenticated, deleteComment);
//delete
router.delete("/user/:userId/post/:postId/delete", isSignedIn, isAuthenticated, deletePost);
module.exports = router;
