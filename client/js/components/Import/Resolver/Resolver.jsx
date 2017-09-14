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
          name: string
        })
      })
    ),
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

  /* new */

  handleNewNameChange = R.memoize((key) => (name) => {
    const { resolveMethod } = this.state;

    const newNameLens = R.lensPath([key, "new", "name"]);

    this.setState({
      resolveMethod: R.compose(
        R.set(newNameLens, name),
      )(resolveMethod)
    });
  })

  handleNewSubmit = R.memoize((key) => (name) => {
    const { resolveMethod } = this.state;

    const resolvedBy = {
      type: "new",
      display: name,
      data: name
    };

    this.setState({
      resolveMethod: this.resolveWith(key, resolvedBy, resolveMethod)
    });
  })



  /* render */

  render = () => {

    const { results, resolverState } = this.props;

    if (R.isNil(resolverState) || R.isEmpty(resolverState)){
      return null;
    }

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
      </div>
    );
  };

}
