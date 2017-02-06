import React from "react";

import { routePropType } from "./routing.js";

import Dataset from "./Dataset/Dataset.jsx";
import Variable from "./Variable/Variable.jsx";

import DatasetListContainer  from "../containers/DatasetListContainer.js";
import VariableListContainer from "../containers/VariableListContainer.js";
import NavContainer          from "../containers/NavContainer.js";


const App = ({route = {}}) => {

  const getCurrentPageComponent = (route) => {

    if (route.page === "") {
      return "Home!";
    }

    if (route.page === "dataset"){
      if (route.id === "all"){
        return ( <DatasetListContainer {...route.params} /> );
      }
      else {
        return ( <Dataset id={route.id} {...route.params} /> );
      }
    }


    if (route.page === "variable"){
      if (route.id === "all"){
        return ( <VariableListContainer {...route.params}/> );
      }
      else {
        return ( <Variable id={route.id} {...route.params}/> );
      }
    }


    if (route.page === "attribute"){
      return (
        "Attribtes!"
      );
    }

  };


  return (
    <div>
      Hello, Admin!

      <NavContainer />

      {getCurrentPageComponent(route)}

    </div>
  );
};



App.propTypes = {
  route: routePropType
};

export default App;
