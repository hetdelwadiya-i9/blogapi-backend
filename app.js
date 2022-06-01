"use strict";
require('dotenv').config();
var mongoose = require("mongoose");
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cors = require("cors");
//Import Routes
var authRoutes = require("./routes/auth");
var postRoutes = require("./routes/post");
var userRoutes = require("./routes/user");
var draftRoutes = require("./routes/draft");
var adminRoutes = require("./routes/admin");
var app = express();
//Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
//Set Routes
app.use("/api", authRoutes);
app.use("/api", postRoutes);
app.use("/api", userRoutes);
app.use("/api", draftRoutes);
app.use("/api", adminRoutes);
//DB connection
mongoose.connect(process.env.DB_URL)
    .then(function () { return console.log("⚡️[database]: Mongo connected successfully"); });
//server starter
var server = app.listen(process.env.PORT || 8000, function () { return console.log("⚡️[server]: Server started on port: " + process.env.PORT); });
module.exports = server;
