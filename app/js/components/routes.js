import React from "react";
import R from "ramda";

import Home from "./Home/Home.jsx";
import Variable from "./Variable/Variable.jsx";

import DatasetContainer      from "../containers/DatasetContainer.js";
import DatasetListContainer  from "../containers/DatasetListContainer.js";
import VariableListContainer from "../containers/VariableListContainer.js";


export const pages = {
  "" : {
    label: "Home",
    component: Home
  },
  "datasets": {
    label: "Datasets",
    component: DatasetListContainer
  },
  "dataset": {
    hasId: true,
    component: DatasetContainer
  },
  "variables": {
    label: "Variables",
    component: VariableListContainer
  },
  "variable": {
    hasId: true,
    component: Variable
  },
};


const { string, shape, object } = React.PropTypes;

export const routePropType = shape({
  page: string.isRequired,
  id: string,
  args: object
});


export const renderPage = (route) => {

  const pageObj = pages[route.page];


  return (pageObj)
    ? (
      React.createElement(
        pageObj.component,
        {} // don't pass anything (or should we pass the route.args?)
      )
    )
    : "Page not found!";

};
