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
const Fetchable = (Component) => {

  // defining these here so we can use R.keys below
  const fetchablePropTypes = {
    errorLoading       : bool.isRequired,
    errorLoadingMessage: string.isRequired,
    fetchAction        : func.isRequired,
    hasData            : bool.isRequired,
    isLoading          : bool.isRequired,
  };

  return class FetchableComponent extends React.Component {

    static propTypes = fetchablePropTypes;

    componentWillMount = () => {
      this.props.fetchAction();
    }

    render = () => {

      const { isLoading, errorLoading, errorLoadingMessage, hasData } = this.props;

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

        // remove the props specific to FetchableComponent so we can pass them to Component
        const componentProps = R.omit(R.keys(fetchablePropTypes), this.props);

        // if there was no error and it's not loading, show the component
        return <Component {...componentProps} />;
      }

      else {
        return null;
      }

    };

  };
};

export default Fetchable;
