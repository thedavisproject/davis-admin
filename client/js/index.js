import React             from "react";
import ReactDOM          from "react-dom";
import { BrowserRouter } from "react-router-dom";
import thunkMiddleware   from "redux-thunk";
import { Provider }      from "react-redux";

import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import ApolloClient from "apollo-client";
import { getAuthCookie } from "./components/Authorization/cookie.js";


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

 // https://www.apollographql.com/docs/react/recipes/authentication.html
const authLink = setContext((_, { headers }) => {

   // get the authentication token from local storage if it exists
  const token = getAuthCookie();

   // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const httpLink = createHttpLink({ uri: "http://api.davis.velir.com/graphql" });


// Initialize Apollo Client with URL to our server
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});



// integrate apollo into the store http://dev.apollodata.com/react/redux.html
const rootReducer = createRootReducer();
const middlewares = [ thunkMiddleware ];

const store = configureStore(rootReducer, {}, middlewares);


// render app
ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={apolloClient} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>,
  document.querySelector(".js-mount")
);
