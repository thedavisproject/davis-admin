import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./Home/Home.jsx";
import Nav from "./Nav/Nav.jsx";
import DatasetListWithData from "./DatasetList/DatasetListWithData.js";
import DatasetWithData from "./Dataset/DatasetWithData.js";
import VariableListWithData from "./VariableList/VariableListWithData.js";
import VariableWithData from "./Variable/VariableWithData.js";
import Import from "./Import/Import.jsx";

import parsePairs from "./parsePairs.js";

const App = () => {

  return (
    <div className="container">

      <Nav />

      <div className="main">

        <Switch>

          <Route exact path="/" render={({ match }) => (
            <Home />
          )} />

          <Route path="/datasets/:rest*" render={({ match }) => {
            return (
              <DatasetListWithData {...parsePairs(match.params.rest)} />
            );
          }} />

          <Route path="/dataset/:id/:rest*" render={({ match }) => {
            return (
              <DatasetWithData id={match.params.id} {...parsePairs(match.params.rest)} />
            );
          }} />

          <Route path="/variables/:rest*" render={({ match }) => {
            return (
              <VariableListWithData {...parsePairs(match.params.rest)} />
            );
          }} />

          <Route path="/variable/:id/:rest*" render={({ match }) => {
            return (
              <VariableWithData id={match.params.id} {...parsePairs(match.params.rest)} />
            );
          }} />


          <Route path="/import/:rest*" render={({ match }) => {
            return (
              <Import {...parsePairs(match.params.rest)} />
            );
          }} />

          {/* 404 redirects to homepage */}
          <Redirect to="/" />

        </Switch>

      </div>
    </div>
  );
};

export default App;
