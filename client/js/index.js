import React             from "react";
import ReactDOM          from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider }      from "react-redux";
import thunkMiddleware   from "redux-thunk";

import configureStore from "./redux/configureStore.js";
import rootReducer    from "./redux/rootReducer.js";

import App from "./components/App.jsx";

/* create store */
const store = configureStore(rootReducer, {}, [ thunkMiddleware ]);

/* render app */
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.querySelector(".js-mount")
);
