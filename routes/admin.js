"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var _a = require("../controllers/admin"), getUsers = _a.getUsers, getUser = _a.getUser, getTotalUserPages = _a.getTotalUserPages, getNonApprovedPosts = _a.getNonApprovedPosts, getTotalApprovedPostPages = _a.getTotalApprovedPostPages, getTotalNonApprovedPostPages = _a.getTotalNonApprovedPostPages, getApprovedPosts = _a.getApprovedPosts, approvePost = _a.approvePost, removeUser = _a.removeUser, removePost = _a.removePost;
var getUserById = require("../controllers/user").getUserById;
var getPostById = require("../controllers/post").getPostById;
var _b = require("../middlewares/auth"), isAuthenticated = _b.isAuthenticated, isSignedIn = _b.isSignedIn, isAdmin = _b.isAdmin;
router.param("adminId", getUserById);
router.param("postId", getPostById);
//read
router.get("/admin/:adminId/users/pages", isSignedIn, isAdmin, getTotalUserPages);
router.post("/admin/:adminId/users", isSignedIn, isAuthenticated, isAdmin, getUsers);
router.get("/admin/:adminId/users/:userId", isSignedIn, isAdmin, getUser);
router.get("/admin/:adminId/posts/approval/pending/pages", isSignedIn, isAuthenticated, isAdmin, getTotalNonApprovedPostPages);
router.post("/admin/:adminId/posts/approval/pending", isSignedIn, isAuthenticated, isAdmin, getNonApprovedPosts);
router.get("/admin/:adminId/posts/approved/pages", isSignedIn, isAuthenticated, isAdmin, getTotalApprovedPostPages);
router.post("/admin/:adminId/posts/approved", isSignedIn, isAuthenticated, isAdmin, getApprovedPosts);
//update
router.put("/admin/:adminId/post/:postId/approve", isSignedIn, isAuthenticated, isAdmin, approvePost);
//delete
router.delete("/admin/:adminId/user/:userId/delete", isSignedIn, isAuthenticated, isAdmin, removeUser);
router.delete("/admin/:adminId/post/:postId/delete", isSignedIn, isAuthenticated, isAdmin, removePost);
module.exports = router;
