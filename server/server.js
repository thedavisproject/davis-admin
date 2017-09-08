const express = require("express");
const path = require("path");
const historyApiFallback = require("connect-history-api-fallback");
const quench = require("../gulp/quench.js");
const app = express();

const root = path.resolve(__dirname, "..", "build");
const port = process.env.PORT || 3030;


/* index */

app.get("/api", function(req, res){
  res.send("api goes here!");
});

app.get("/", function(req, res){
  res.sendFile(path.resolve(root, "index.html"));
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
