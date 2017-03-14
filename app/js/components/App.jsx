import React from "react";

import { routePropType, renderPage } from "./routes.js";

import NavContainer from "../containers/NavContainer.js";

const App = ({route = {}}) => {

  return (
    <div className="container">
      Hello, Admin!

      <NavContainer />

      <div className="main">
        { renderPage(route) }
      </div>

    </div>
  );
};



App.propTypes = {
  route: routePropType
};

export default App;
