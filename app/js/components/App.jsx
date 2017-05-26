import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./Home/Home.jsx";
import Nav from "./Nav/Nav.jsx";
import DatasetListContainer from "./DatasetList/DatasetListContainer.js";
import DatasetRoute from "./Dataset/DatasetRoute.js";
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

            {/* <DatasetRoute /> */}

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
