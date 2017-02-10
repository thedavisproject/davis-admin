import React from "react";
import R from "ramda";

import Home from "./Home/Home.jsx";
import Dataset from "./Dataset/Dataset.jsx";
import Variable from "./Variable/Variable.jsx";

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
    component: Dataset
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
  params: object
});


export const renderPage = (route) => {

  const pageObj = pages[route.page];

  const params = R.merge(route.params, {
    id: route.id
  });


  return (pageObj)
    ? (
      React.createElement(
        pageObj.component,
        params
      )
    )
    : "Page not found!";

};
