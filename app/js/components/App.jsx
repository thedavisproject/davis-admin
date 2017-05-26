import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home/Home.jsx";
import Nav from "./Nav/Nav.jsx";
import DatasetListRoute from "./DatasetList/DatasetListRoute.jsx";
import DatasetRoute from "./Dataset/DatasetRoute.js";

import Fetch from "./Fetch/Fetch.jsx";
import parsePairs from "./parsePairs.js";

const App = () => {

  return (
    <Router>
      <div className="container">

        <Nav />

        <div className="main">

            <Route exact path="/" render={({ match }) => (
              <Home />
            )} />

            <DatasetListRoute />

            <DatasetRoute />

            <Route exact path="/variables/:rest*" render={({ match }) => (
              <div> variables </div>
            )} />

            <Route exact path="/variable/:id/:rest*" render={({ match }) => (
              <div> variable {match.params.id} </div>
            )} />

        </div>

      </div>
    </Router>
  );
};

export default App;
