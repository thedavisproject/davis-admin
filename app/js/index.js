import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";

import App from "./components/App.jsx";

import configureStore from "./redux/configureStore.js";
import rootReducer from "./redux/rootReducer.js";

/* create store */
const store = configureStore(rootReducer, {}, [ thunkMiddleware ]);

/* render app */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector(".js-mount")
);
