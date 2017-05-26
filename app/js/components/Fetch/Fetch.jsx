import React from "react";

import { func, string } from "prop-types";

export default class Fetch extends React.Component {

  static propTypes = {
    url: string.isRequired,
    mapJsonToProps: func,
    renderError: func,
    renderLoading: func,
    renderData: func.isRequired
  }

  static defaultProps = {
    mapJsonToProps: (json) => json
  }

  state = {
    error: undefined,
    isLoading: true,
    props: undefined
  }

  componentWillMount = () => {

    const { url, mapJsonToProps } = this.props;

    fetch(url)
      .then(response => response.json())
      .then(json => {
        const props = mapJsonToProps(json);

        this.setState({
          props,
          isLoading: false
        });
      })
      .catch(error => {

        this.setState({
          error: error,
          isLoading: false
        });

        throw new Error(error);
      });
  }

  render = () => {

    const { renderError, renderLoading, renderData } = this.props;
    const { error, isLoading, props } = this.state;


    // display the errorLoadingMessage if there is an error
    if (error){
      return (typeof(renderError) === "function")
         ? renderError(error)
         : (
           <div className="loading-error">
             Loading error. Try again later
           </div>
          );
    }
    // the consumer will tell us if they've kicked off a fetch
    else if (isLoading){
      return (typeof(renderLoading) === "function")
        ? renderLoading()
        : (
          <div className="loading">Loading...</div>
        );
    }

    else if (props) {
      // if there was no error and it's not loading, show the component
      return renderData(props);
    }

    else {
      return null;
    }

  }

}
