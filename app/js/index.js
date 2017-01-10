import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import AppContainer from "./containers/AppContainer.js";

import configureStore from "./redux/configureStore.js";
import rootReducer from "./redux/rootReducer.js";

const store = configureStore(rootReducer);

const mountNode = document.querySelector(".js-mount");

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  mountNode
);
