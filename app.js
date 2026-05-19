var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// const hbs = require('hbs');
const exphbs = require("express-handlebars"); // layout and partials
const fileUpload = require("express-fileupload"); // upload file / images
// database connection
const { connectDB } = require("./config/connection.js");
// Session-Cookies
const sessionCookies = require("express-session");

// Routes
var userRouter = require("./routes/userRouter");
var adminRouter = require("./routes/adminRouter");

var app = express();
connectDB();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// setup handlebars
app.engine(
  "hbs",
  exphbs.engine({
    extname: ".hbs",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
    defaultLayout: "layout", // layout file name
  }),
);
// enable file upload
app.use(fileUpload());
// Session Cookies
app.use(
  sessionCookies({
    secret: "secret_key", // change this to something secure
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
      httpOnly: true,
    },
  }),
);
// Prevent browser caching
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", userRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
