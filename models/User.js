"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var mongoose_1 = __importDefault(require("mongoose"));
var crypto_1 = __importDefault(require("crypto"));
var uuidv1 = require("uuid").v1;
var ObjectId = mongoose_1.default.Schema.Types.ObjectId;
var userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    posts: [{
            type: ObjectId,
            ref: "Post"
        }],
    drafts: [{
            type: ObjectId,
            ref: "Draft"
        }],
    role: {
        type: Number,
        default: 0
    },
    encry_password: {
        type: String,
        required: true
    },
    salt: String,
}, { timestamps: true });
userSchema
    .virtual("password")
    .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
})
    .get(function () {
    return this._password;
});
userSchema.methods = {
    authenticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
    },
    securePassword: function (plainpassword) {
        if (!plainpassword)
            return "";
        try {
            return crypto_1.default
                .createHmac('sha256', this.salt)
                .update(plainpassword)
                .digest('hex');
        }
        catch (err) {
            return "";
        }
    }
};
var User = mongoose_1.default.model("User", userSchema);
module.exports = User;
