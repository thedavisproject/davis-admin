import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./Home/Home.jsx";
import Nav from "./Nav/Nav.jsx";
import DatasetListContainer from "./DatasetList/DatasetListContainer.js";
import DatasetContainer from "./Dataset/DatasetContainer.js";
import VariableListContainer from "./VariableList/VariableListContainer.js";
import VariableContainer from "./Variable/VariableContainer.js";
import ImportContainer from "./Import/ImportContainer.js";
import AuthorizationContainer from "./Authorization/AuthorizationContainer.js";


import parsePairs from "./parsePairs.js";

const App = () => {

  return (
    <div className="container">

      <AuthorizationContainer>

          <Nav />

          <div className="main">


            <Switch>

              <Route exact path="/" render={({ match }) => (
                <Home />
              )} />

              <Route path="/datasets/:rest*" render={({ match }) => {
                return (
                  <DatasetListContainer {...parsePairs(match.params.rest)} />
                );
              }} />

              <Route path="/dataset/:id/:rest*" render={({ match }) => {
                return (
                  <DatasetContainer id={match.params.id} {...parsePairs(match.params.rest)} />
                );
              }} />

              <Route path="/variables/:rest*" render={({ match }) => {
                return (
                  <VariableListContainer {...parsePairs(match.params.rest)} />
                );
              }} />

              <Route path="/variable/:id/:rest*" render={({ match }) => {
                return (
                  <VariableContainer id={match.params.id} {...parsePairs(match.params.rest)} />
                );
              }} />


              <Route path="/import/:rest*" render={({ match }) => {
                return (
                  <ImportContainer {...parsePairs(match.params.rest)} />
                );
              }} />

              {/* 404 redirects to homepage */}
              <Redirect to="/" />

            </Switch>

          </div>

      </AuthorizationContainer>
    </div>
  );
};

export default App;
