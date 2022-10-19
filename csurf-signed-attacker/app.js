var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var csurf = require("csurf");

var attackRouter = require("./routes/attack");
var tossRouter = require("./routes/toss");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("Irrelevant but this is value on attacker side (unused in fact)"));
app.use(express.static(path.join(__dirname, "public")));


app.use(csurf({ cookie: { signed: true } }));

app.use("/", attackRouter);
app.use("/toss", tossRouter);

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
