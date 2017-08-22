import React             from "react";
import ReactDOM          from "react-dom";
import { BrowserRouter } from "react-router-dom";
import thunkMiddleware   from "redux-thunk";

import {
  ApolloClient, ApolloProvider, createBatchingNetworkInterface
} from "react-apollo";

// see TODO below import { createOneAtATimeNetworkInterface } from "./OneAtATimeNetworkInterface.js";

import configureStore from "./redux/configureStore.js";
import createRootReducer    from "./redux/createRootReducer.js";

import App from "./components/App.jsx";


// const loggingMiddleware = {
//   applyBatchMiddleware(req, next) {
//     console.log("req", req);
//     next();
//   }
// };

const networkInterface = createBatchingNetworkInterface({
  uri: "http://api.davis.velir.com/graphql",
  batchInterval: 1000
});
// .use([ loggingMiddleware ]);


/*
  TODO
  find a soution that satisfies the following,
  maybe a custom networkInterface that has debounce and network queues

  - [ ] immediate feedback to the user
  - [ ] debounce to the server
  - [ ] no race conditions (mutation queue)
  - [ ] updates client when the server changes
  - [ ] state lives in one place (apollo cache)
 */


// Initialize Apollo Client with URL to our server
const apolloClient = new ApolloClient({
  networkInterface: networkInterface
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
