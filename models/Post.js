"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var mongoose_1 = __importDefault(require("mongoose"));
var ObjectId = mongoose_1.default.Schema.Types.ObjectId;
var postSchema = new mongoose_1.default.Schema({
    postTitle: {
        type: String,
        required: true,
        trim: true
    },
    postShortDescription: {
        type: String,
        required: true,
        trim: true
    },
    postData: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: ObjectId,
        ref: "User"
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    comments: [{}]
}, { timestamps: true });
var Post = mongoose_1.default.model("Post", postSchema);
module.exports = Post;
