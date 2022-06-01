"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var getUserById = require("../controllers/user").getUserById;
var _a = require("../controllers/draft"), getDraftById = _a.getDraftById, createDraft = _a.createDraft, getDraft = _a.getDraft, getUserDrafts = _a.getUserDrafts, updateDraft = _a.updateDraft, deleteDraft = _a.deleteDraft, publishDraftToPost = _a.publishDraftToPost;
var _b = require("../middlewares/auth"), isAuthenticated = _b.isAuthenticated, isSignedIn = _b.isSignedIn;
router.param("userId", getUserById);
router.param("draftId", getDraftById);
//create
router.post("/user/:userId/draft/create", isSignedIn, isAuthenticated, createDraft);
//read
router.get("/user/:userId/draft/:draftId", isSignedIn, isAuthenticated, getDraft);
router.get("/user/:userId/drafts", isSignedIn, isAuthenticated, getUserDrafts);
//update
router.put("/user/:userId/draft/:draftId/update", isSignedIn, isAuthenticated, updateDraft);
//delete
router.delete("/user/:userId/draft/:draftId/delete", isSignedIn, isAuthenticated, deleteDraft);
router.post("/user/:userId/draft/:draftId/publish", isSignedIn, isAuthenticated, publishDraftToPost);
module.exports = router;
