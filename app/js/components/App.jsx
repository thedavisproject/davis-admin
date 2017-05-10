import React from "react";

import Home from "./Home/Home.jsx";
import { Router, Route } from "./Router.jsx";
import NavContainer          from "../containers/NavContainer.js";
import DatasetContainer      from "../containers/DatasetContainer.js";
import DatasetListContainer  from "../containers/DatasetListContainer.js";
import VariableContainer     from "../containers/VariableContainer.js";
import VariableListContainer from "../containers/VariableListContainer.js";

import { string } from "prop-types";

const propTypes = {
  pageId: string
};

const App = ({ pageId }) => {

  return (
    <div className="container">

      <NavContainer />

      <div className="main">

        <Router match={pageId}>

          <Route match="" render={() => <Home />} />

          <Route match="dataset" render={() => <DatasetContainer />} />

          <Route match="datasets" render={() => <DatasetListContainer />} />

          <Route match="variables" render={() => <VariableListContainer />} />

          <Route match="variable" render={() => <VariableContainer />} />

        </Router>

      </div>

    </div>
  );
};

App.propTypes = propTypes;

export default App;
