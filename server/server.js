const express = require("express");
const path = require("path");
const historyApiFallback = require("connect-history-api-fallback");
const quench = require("../gulp/quench.js");
const app = express();

const root = path.resolve(__dirname, "..", "build");

/* datasets */

app.get("/api/datasets", function(req, res){
  res.sendFile(path.resolve(root, "fakedata/datasets.json"));
});

app.get("/api/dataset/:id", function(req, res){

  const id = req.params.id;

  const json = {
    id: id,
    name: `Dataset ${id}`,
    info: `what ${id}`
  };

  res.send(JSON.stringify(json, null, 2));
});


/* variables */

app.get("/api/variables", function(req, res){
  res.sendFile(path.resolve(root, "fakedata/variables.json"));
});

app.get("/api/variable/:id", function(req, res){

  const id = req.params.id;

  const json = {
    id: id,
    name: `Variable ${id}`,
    info: `data ${id}`
  };

  res.send(JSON.stringify(json, null, 2));
});



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





app.listen(3030, function () {
  quench.logYellow("server.js", "Listening on port 3030...");
});

module.exports = app;
