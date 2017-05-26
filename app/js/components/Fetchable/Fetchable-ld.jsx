import React from "react";
import R from "ramda";

import { bool, func, string } from "prop-types";

/**
 * A Higher order component that adds loading and loading errors to a component
 * (http://natpryce.com/articles/000814.html)
 *
 * usage:
 * const AsyncMyComponent = Fetchable(MyComponent)
 *
 * <AsyncMyComponent isLoading={false} ... myComponentProps="..." />
 *
 * @param {Component} Component : A react component
 * @returns {Component} enhanced component
 */
const Fetchable = (fetchAction) => (Component) => {

  const fetchablePropTypes = {
    errorLoading       : bool.isRequired,
    errorLoadingMessage: string.isRequired,
    hasData            : bool.isRequired,
    isLoading          : bool.isRequired,
  };

  console.log("FETCHIGN!");
  // kick off the fetch action (function that dispatches some redux fetch action)
  fetchAction();

  const FetchableComponent = (props) => {

    const { errorLoading, errorLoadingMessage, hasData, isLoading, ...componentProps } = props;


    // display the errorLoadingMessage if there is an error
    if (errorLoading){
      return (
        <div className="loading-error">{errorLoadingMessage}</div>
      );
    }

    // the consumer will tell us if they've kicked off a fetch
    else if (isLoading){
      return (
        <div className="loading">Loading...</div>
      );
    }

    // we don't know if the data has everything it needs to render this component
    // hasData is a way for the consumer to let us know when we can render
    else if (hasData) {

      // if there was no error and it's not loading, show the component
      return <Component {...componentProps} />;
    }

    else {
      return null;
    }

  };

  FetchableComponent.propTypes = fetchablePropTypes;

  return FetchableComponent;

};

export default Fetchable;
