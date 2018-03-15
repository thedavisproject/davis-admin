const express = require("express");
const path = require("path");
const historyApiFallback = require("connect-history-api-fallback");
const quench = require("../gulp/quench/quench.js");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const root = path.resolve(__dirname, "..", "build");
const port = process.env.PORT || 3030;


/* index */

app.set("view engine", "ejs"); // set up ejs for templating
app.set("views", path.resolve(__dirname, "./views")); // set up the views directory

// include cookies in the req
app.use(cookieParser());

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/api", function(req, res){
  res.send("api goes here!");
});


app.get("/", function(req, res){
  res.render("index");
});


// https://github.com/BrowserSync/browser-sync/issues/204
app.use(historyApiFallback({
  // verbose: true,
  index: "/"
}));

// server js and css files, etc
app.use(express.static(root));



app.listen(port, function () {
  quench.logYellow("server.js", `Listening on port ${port}...`);
});

module.exports = app;
