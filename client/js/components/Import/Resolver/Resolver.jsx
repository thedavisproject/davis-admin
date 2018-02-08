import React from "react";
import ResolverRow from "./ResolverRow.jsx";
import R from "ramda";

import {
  any, arrayOf, bool, func, number, objectOf, oneOf, shape, string
} from "prop-types";


export default class Resolver extends React.Component {

  static propTypes = {
    initResolverState: func.isRequired,
    onMethodSelect: func.isRequired,
    onMethodClear: func.isRequired,
    onImport: func.isRequired,
    resolverState: objectOf(
      shape({
        key: string,
        selected: oneOf(["", "choose", "new", "ignore"]),
        resolvedBy: shape({
          type: oneOf(["choose", "new", "ignore"]),
          display: string,
          data: any
        }),
        choose: shape({
          query: string
        }),
        new: shape({
          name: string,
          type: string
        })
      })
    ),
    results: arrayOf(shape({ // list of variables
      // if categorical...
      values: arrayOf(shape({
        value: string.isRequired,
        match: bool.isRequired,
        atrribute: string.isRequired
      })).isRequired,
      key: string.isRequired,
      match: bool,
      variable: shape({
        id: number,
        name: string
      })
    })).isRequired
  };


  componentWillMount = () => {
    this.props.initResolverState(this.props.results);
  }


  // tab change
  handleMethodSelect = R.memoize((key) => (method) => {
    this.props.onMethodSelect(key, method);
  })


  handleMethodReset = R.memoize((key) => () => {
    this.handleMethodSelect(key)("");
  })


  handleMethodClear = R.memoize((key) => () => {
    this.props.onMethodClear(key);
  })


  handleImport = (e) => {

    const { resolverState } = this.props;

    this.props.onImport(resolverState);

  }


  /* render */

  render = () => {

    const { results, resolverState } = this.props;

    if (R.isNil(resolverState) || R.isEmpty(resolverState)){
      return null;
    }

    const isResolved = R.compose(
      R.all(R.compose(R.not, R.isNil, R.prop("resolvedBy"))),
      R.values
    )(resolverState);

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
                  method={resolverState[key]}
                  onMethodSelect={this.handleMethodSelect(key)}
                  onMethodClear={this.handleMethodClear(key)}
                />
              );
            })}
          </tbody>
        </table>

        <button
          type="button"
          disabled={!isResolved}
          title={!isResolved ? "Some variables are not resolved" : ""}
          onClick={this.handleImport}
        >
          Import
        </button>
      </div>
    );
  };

}
