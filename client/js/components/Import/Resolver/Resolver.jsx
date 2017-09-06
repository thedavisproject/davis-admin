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

  // state is initialized in componentWillMount
  state = {};

  componentWillMount = () => {

    // TODO this sucks having to do this here instead of in state = {} above,
    // but this.handleChooseQueryUpdate is undefined then...
    this.setState({
      resolveMethod: R.reduce((lookup, result) => {
        const { attributes, key, match, variable } = result;

        lookup[key] = {
          selected: "", // "choose", "new", "ignore", or ""
          choose: {
            query: key,
            onQueryUpdate: this.handleChooseQueryUpdate(key),
            selectedVariable: null,
            onVariableSelect: this.handleChooseVariableSelect(key),
            onChangeClick: this.handleChooseChange(key)
          },
          new: {},
          ignore: {
            // onResetClick: () => console.log("POOO")
            onResetClick: this.handleMethodReset(key)
          }
        };

        return lookup;
      }, {})(this.props.results)
    });
  }

  handleMethodChange = R.memoize((key) => (method) => {
    const { resolveMethod } = this.state;

    // console.log("change", key, method);

    // we want to set { [key]: { type: "this!" }}
    const methodLens = R.lensPath([key, "selected"]);

    this.setState({
      resolveMethod: R.set(methodLens, method, resolveMethod)
    });
  })


  handleMethodReset = R.memoize((key) => () => {
    this.handleMethodChange(key)("");
  })


  handleChooseQueryUpdate = R.memoize((key) => (query) => {
    const { resolveMethod } = this.state;

    const queryLens = R.lensPath([key, "choose", "query"]);

    this.setState({
      resolveMethod: R.set(queryLens, query, resolveMethod)
    });
  })

  handleChooseVariableSelect = (key) => (variable) => {

    const { resolveMethod } = this.state;

    const queryLens = R.lensPath([key, "choose", "query"]);
    const selectedVariableLens = R.lensPath([key, "choose", "selectedVariable"]);

    this.setState({
      resolveMethod: R.compose(
        R.set(queryLens, ""),
        R.set(selectedVariableLens, variable)
      )(resolveMethod)
    });
  }

  handleChooseChange = (key) => () => {
    const { resolveMethod } = this.state;

    const selectedVariableLens = R.lensPath([key, "choose", "selectedVariable"]);

    this.setState({
      resolveMethod: R.set(selectedVariableLens, null, resolveMethod)
    });
  }

  render = () => {

    const { resolveMethod } = this.state;
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
                  method={resolveMethod[key]}
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
