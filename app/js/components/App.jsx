import React from "react";

import { routePropType, renderPage } from "./routes.js";

import NavContainer from "../containers/NavContainer.js";

const App = ({route = {}}) => {

  return (
    <div className="container">
      Hello, Admin!

      <NavContainer />

      { renderPage(route) }

    </div>
  );
};



App.propTypes = {
  route: routePropType
};

export default App;
