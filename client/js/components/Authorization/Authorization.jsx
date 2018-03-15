import R from "ramda";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import LoginContainer from "./LoginContainer.js";

import { bool, node } from "prop-types";

const propTypes = {
  children: node.isRequired,
  isAuthorized: bool
};


const Authorization = (props) => {

  const { children, isAuthorized = false } = props;

  return (
    <Switch>
      <Route path="/login" render={({ match, location }) => {

        const from = R.compose(
          R.defaultTo("/"),
          R.path(["state", "from", "pathname"])
        )(location);

        return !isAuthorized
          ? (
            <LoginContainer from={from} />
          )
          : (
            <Redirect to={from} />
          );
      }} />

      <Route path="*" render={({ location }) => {

        return !isAuthorized
          ? (
            <Redirect to={{
              pathname: "/login",
              state: { from: location }
            }} />
          )
          : (
            children
          );
      }} />
    </Switch>
  );
};

Authorization.propTypes = propTypes;
export default Authorization;
