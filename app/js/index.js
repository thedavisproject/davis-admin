import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App.jsx";


const mountNode = document.querySelector(".js-mount");

ReactDOM.render(
  <App />,
  mountNode
);
