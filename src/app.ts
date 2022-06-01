require('dotenv').config()
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//Import Routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const draftRoutes = require("./routes/draft");
const adminRoutes = require("./routes/admin");

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Set Routes
app.use("/api",  authRoutes);
app.use("/api",  postRoutes);
app.use("/api",  userRoutes);
app.use("/api",  draftRoutes);
app.use("/api",  adminRoutes);

//DB connection
mongoose.connect(process.env.DB_URL)
.then(() => console.log("⚡️[database]: Mongo connected successfully"));






//server starter
const server = app.listen(process.env.PORT || 8000, () => console.log("⚡️[server]: Server started on port: "+process.env.PORT));
module.exports = server