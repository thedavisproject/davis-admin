import React from "react";
import ResolverRow from "./ResolverRow.jsx";
import R from "ramda";

import { arrayOf, bool, number, shape, string } from "prop-types";


export default class Resolver extends React.Component {

  static propTypes = {
    results: arrayOf(shape({
      // if categorical...
      attributes: arrayOf(shape({
        name: string.isRequired,
        match: bool.isRequired,
        atrribute: string.isRequired
      })),
      key: string.isRequired,
      match: bool,
      variable: shape({
        id: number,
        name: string
      })
    })).isRequired
  };

  state = {
    // initalize the resolved status for each variable
    resolved: R.compose(
      R.fromPairs,
      R.map(result => {
        const { key, variable } = result;
        return [key, {
          // method: oneOf(["", "new", "choose", "ignore"])
          method: variable ? "new" : "choose"
        }];
      }),
    )(this.props.results)

  };

  handleMethodChange = R.memoize((key) => (method) => {
    const { resolved } = this.state;

    // we want to set { key: { method: "this!" }}
    const methodLens = R.lensPath([key, "method"]);

    this.setState({
      resolved: R.set(methodLens, method, resolved)
    });
  })

  render = () => {

    const { resolved } = this.state;
    const { results } = this.props;

    return (
      <div>
        <div>Found {results.length} variables:</div>

        <table>
          <tbody>
            {results.map(result => {

              const { key, variable } = result;

              return (
                <ResolverRow key={key}
                  columnHeader={key}
                  variable={variable}
                  method={resolved[key].method}
                  onMethodChange={this.handleMethodChange(key)}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

}
