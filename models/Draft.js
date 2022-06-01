"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var mongoose_1 = __importDefault(require("mongoose"));
var ObjectId = mongoose_1.default.Schema.Types.ObjectId;
var draftSchema = new mongoose_1.default.Schema({
    draftTitle: {
        type: String,
        required: true,
        trim: true
    },
    draftData: {
        type: String,
        required: true,
        trim: true
    },
    draftShortDescription: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: ObjectId,
        ref: "User"
    }
}, { timestamps: true });
var Draft = mongoose_1.default.model("Draft", draftSchema);
module.exports = Draft;
