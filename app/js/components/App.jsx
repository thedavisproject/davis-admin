import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./Home/Home.jsx";
import Nav from "./Nav/Nav.jsx";
import DatasetListContainer from "./DatasetList/DatasetListContainer.js";
import DatasetContainer from "./Dataset/DatasetContainer.js";

import parsePairs from "./parsePairs.js";

const App = () => {

  return (
    <Router>
      <div className="container">

        <Nav />

        <div className="main">

          <Switch>

            <Route exact path="/" render={({ match }) => (
              <Home />
            )} />

            <Route path="/datasets/:rest*" render={({ match }) => {
              return (
                <DatasetListContainer {...parsePairs(match.params.rest)}/>
              );
            }} />

            <Route path="/dataset/:id/:rest*" render={({ match }) => {
              return (
                <DatasetContainer id={match.params.id} {...parsePairs(match.params.rest)}/>
              );
            }} />

            <Route exact path="/variables/:rest*" render={({ match }) => (
              <div> variables </div>
            )} />

            <Route exact path="/variable/:id/:rest*" render={({ match }) => (
              <div> variable {match.params.id} </div>
            )} />

          </Switch>

        </div>
      </div>
    </Router>
  );
};

export default App;
