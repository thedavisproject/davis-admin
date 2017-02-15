const express = require("express");
const path = require("path");
const historyApiFallback = require("connect-history-api-fallback");

const app = express();

const root = path.resolve(__dirname, "..", "build");


app.get("/", function(req, res){
  res.sendFile(path.resolve(root, "index.html"));
});

app.get("/api", function(req, res){
  res.send("api goes here!");
});



// https://github.com/BrowserSync/browser-sync/issues/204
app.use(historyApiFallback({
  // verbose: true,
  index: "/"
}));

// server js and css files, etc
app.use(express.static(root));





app.listen(3030, function () {
  console.log("Listening on port 3030...");
});

module.exports = app;
