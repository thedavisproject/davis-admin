import React from "react";
import R from "ramda";

import { bool, string } from "prop-types";

/**
 * A Higher order component that adds loading and loading errors to a component
 * (http://natpryce.com/articles/000814.html)
 *
 * usage:
 * const AsyncMyComponent = Promised(MyComponent)
 *
 * <AsyncMyComponent isLoading={false} ... myComponentProps="..." />
 *
 * @param {Component} Component : A react component
 * @returns {Component} enhanced component
 */
const Promised = (Component) => {

  // defining these here so we can use R.keys below
  const promisedPropTypes = {
    errorLoading       : bool.isRequired,
    errorLoadingMessage: string.isRequired,
    hasData            : bool.isRequired,
    isLoading          : bool.isRequired,
  };

  const PromisedComponent = (props) => {

    const { isLoading, errorLoading, errorLoadingMessage, hasData } = props;

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

      // remove the props specific to PromisedComponent so we can pass them to Component
      const componentProps = R.omit(R.keys(promisedPropTypes), props);

      // if there was no error and it's not loading, show the component
      return <Component {...componentProps} />;
    }

    else {
      return null;
    }

  };

  PromisedComponent.propTypes = promisedPropTypes;

  return PromisedComponent;

};

export default Promised;
