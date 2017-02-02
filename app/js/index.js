import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import AppContainer from "./containers/AppContainer.js";

import configureStore from "./redux/configureStore.js";
import rootReducer from "./redux/rootReducer.js";

/* routing */
import createRoutingMiddleware             from "./redux/routing/createRoutingMiddleware.js";
import { mapStateToPath, handleUrlChange } from "./redux/routing/routing.js";

const routingMiddleware = createRoutingMiddleware({ mapStateToPath, handleUrlChange });


/* create store */
const store = configureStore(rootReducer, {}, [routingMiddleware]);


/* render app */
ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.querySelector(".js-mount")
);
