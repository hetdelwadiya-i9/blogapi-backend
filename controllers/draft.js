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
var Draft_1 = __importDefault(require("../models/Draft"));
var User_1 = __importDefault(require("../models/User"));
var Post_1 = __importDefault(require("../models/Post"));
exports.getDraftById = function (req, res, next, id) {
    Draft_1.default.findById(id)
        .populate("user", "name email")
        .exec(function (err, draft) {
        if (err)
            return res.status(400).json({ error: err });
        else if (!draft)
            return res.status(400).json({ Message: "Draft not found!" });
        else {
            req.draft = draft;
            next();
        }
    });
};
exports.getDraft = function (req, res) {
    return res.status(200).json(req.draft);
};
exports.getUserDrafts = function (req, res) {
    Draft_1.default.find({ user: req.profile._id })
        .exec(function (err, drafts) {
        if (err)
            return res.status(400).json({ error: err });
        else if (drafts.length < 1)
            return res.status(400).json({ Message: "No drafts found!" });
        else {
            return res.status(200).json(drafts);
        }
    });
};
exports.createDraft = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var draft, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.body.draftData == "" || req.body.draftTitle == "" || req.body.draftShortDescription == "" || req.body.user == "") {
                    return [2 /*return*/, res.status(400).json({ error: "Please provide all required details!" })];
                }
                draft = new Draft_1.default({
                    draftTitle: req.body.draftTitle,
                    draftData: req.body.draftData,
                    draftShortDescription: req.body.draftShortDescription,
                    user: req.body.user
                });
                return [4 /*yield*/, draft.save()];
            case 1:
                result = _a.sent();
                User_1.default.findByIdAndUpdate({ _id: req.body.user }, { $push: { drafts: result._id } }, { new: true }, function (err, user) {
                    if (err)
                        return res.status(500).json({ error: "Failed to add new draft in user's database!" });
                });
                return [2 /*return*/, res.status(200).json(result)];
        }
    });
}); };
exports.updateDraft = function (req, res) {
    if (req.body.draftData == "" || req.body.draftTitle == "" || req.body.draftShortDescription == "") {
        return res.status(400).json({ error: "Please provide all required details!" });
    }
    Draft_1.default.findByIdAndUpdate({ _id: req.draft._id }, { $set: req.body }, { new: true }, function (err, draft) {
        if (err)
            return res.status(500).json({ error: "Failed to update draft in database!" });
        return res.status(200).json(draft);
    });
};
exports.deleteDraft = function (req, res) {
    Draft_1.default.findByIdAndDelete(req.draft._id, function (err, draft) {
        if (err)
            return res.status(500).json({ error: "Failed to delete draft from database!" });
        User_1.default.findByIdAndUpdate({ _id: draft.user }, { $pull: { drafts: req.draft._id } }, { new: true }, function (err, user) {
            if (err)
                return res.status(500).json({ error: "Failed to update user's draft array in database!" });
        });
    });
    return res.status(200).json({ "Message": "Draft deleted successfully" });
};
exports.publishDraftToPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, error, postInDB;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                post = new Post_1.default({
                    postTitle: req.body.fromInputs ? req.body.postTitle : req.draft.draftTitle,
                    postData: req.body.fromInputs ? req.body.postData : req.draft.draftData,
                    postShortDescription: req.body.fromInputs ? req.body.postShortDescription : req.draft.draftShortDescription,
                    user: req.draft.user,
                    isApproved: false
                });
                error = null;
                return [4 /*yield*/, post.save()];
            case 1:
                postInDB = _a.sent();
                Draft_1.default.findByIdAndDelete(req.draft._id, function (err, draft) {
                    if (err)
                        error = err;
                    User_1.default.findByIdAndUpdate({ _id: draft.user }, { $pull: { drafts: req.draft._id } }, { new: true }, function (err, user) {
                        if (err)
                            error = err;
                    });
                    User_1.default.findByIdAndUpdate({ _id: draft.user }, { $push: { posts: postInDB._id } }, { new: true }, function (err, user) {
                        if (err)
                            error = err;
                    });
                });
                if (error !== null)
                    return [2 /*return*/, res.status(500).json(error)];
                return [2 /*return*/, res.status(200).json({ "Message": "Draft published successfully. Your post will be available once admin approves it." })];
        }
    });
}); };
