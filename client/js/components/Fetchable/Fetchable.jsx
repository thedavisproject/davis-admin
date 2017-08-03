import React from "react";
import R from "ramda";

import { any, bool, shape, string } from "prop-types";

// http://dev.apollodata.com/core/apollo-client-api.html#ApolloError
const apolloError = shape({
  errorMessage: any,
  extraInfo: any,
  graphQLErrors: any,
  networkError: any
});


/**
 * A Higher order component that adds loading and loading errors to a component
 *
 * usage:
 * const AsyncMyComponent = Fetchable(MyComponent)
 *
 * <AsyncMyComponent loading={false} ... props="..." />
 *
 * @param {Component} Component : A react component
 * @returns {Component} enhanced component
 */
const FetchableHOC = (Component) => {

  const propTypes = {
    error   : apolloError,
    errorLoadingMessage: string,
    loading : bool.isRequired,
    props   : any
  };


  const Fetchable = (parentProps) => {

    const { loading, error, errorLoadingMessage, ...props } = parentProps;

    if (error){
      console.error("apollo error: ", error);
      return (
        <div className="loading-error">{errorLoadingMessage || error.message}</div>
      );
    }

    else if (loading){
      return (
        <div className="loading">Loading...</div>
      );
    }

    else if (props) {

      // if there was no error and it's not loading, show the component
      return <Component {...props} />;
    }

    else {
      return null;
    }

  };

  Fetchable.propTypes = propTypes;

  Fetchable.displayName = `Fetchable(${Component.name})`;

  return Fetchable;
};

export default FetchableHOC;
