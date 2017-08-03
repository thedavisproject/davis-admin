import React             from "react";
import ReactDOM          from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider }      from "react-redux";
import thunkMiddleware   from "redux-thunk";

import {
  ApolloClient, ApolloProvider, createNetworkInterface
} from "react-apollo";

import configureStore from "./redux/configureStore.js";
import createRootReducer    from "./redux/createRootReducer.js";

import App from "./components/App.jsx";


// Initialize Apollo Client with URL to our server
const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: "http://api.davis.velir.com/graphql",
  }),
});

// integrate apollo into the store http://dev.apollodata.com/react/redux.html
const rootReducer = createRootReducer(apolloClient.reducer());
const middlewares = [ thunkMiddleware, apolloClient.middleware() ];

const store = configureStore(rootReducer, {}, middlewares);

// render app
ReactDOM.render(
  <ApolloProvider store={store} client={apolloClient} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.querySelector(".js-mount")
);
