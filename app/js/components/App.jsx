import React from "react";

import NavContainer from "../containers/NavContainer.js";

import Home from "./Home/Home.jsx";

import DatasetContainer      from "../containers/DatasetContainer.js";
import DatasetListContainer  from "../containers/DatasetListContainer.js";
import VariableContainer     from "../containers/VariableContainer.js";
import VariableListContainer from "../containers/VariableListContainer.js";

import { Router, Route } from "./Router.jsx";

const App = ({pageId}) => {

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

const { string } = React.PropTypes;

App.propTypes = {
  pageId: string
};

export default App;
