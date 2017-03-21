import React from "react";

/**
 * A very simple router. Usage:
 *
 * <Router match="somePage">
 *   <Route match="" render={() => <div>HOME</div>} />
 *   <Route match="somePage" render={() => <div>SOME PAGE</div>} />
 * </Router>
 */

const { arrayOf, func, string } = React.PropTypes;

// an element to be used with Router
export const Route = () => {};
Route.propTypes = {
  match: string.isRequired,
  render: func.isRequired
};


// emulating https://reacttraining.com/react-router/web/api/Switch
// look at all child <Route>'s and find the first that matches
// the Router's match
export const Router = ({match, children}) => {

  const firstMatched = children.find(element => {
    return (element.props.match === match);
  });

  return firstMatched ? firstMatched.props.render() : null;
};


// custom propTypes to check for a Route
// https://github.com/facebook/react/issues/2979
const isARoute = function(props, propName, componentName) {

  const value = props[propName];

  if (!value || !value.type){
    return new Error(`Bad child ${propName} in ${componentName}.`);
  }

  if (value.type.name !== "Route"){
    return new Error(`Invalid child ${propName} of type "${value.type}" supplied to ${componentName}. Expected "Route"`);
  }

};

Router.propTypes = {
  match: string.isRequired,
  children: arrayOf(isARoute).isRequired
};
