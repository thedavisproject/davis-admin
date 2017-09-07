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

    // normally, we initialize state = {} above,
    // but this.handleChooseQueryUpdate is undefined then...
    this.setState({
      resolveMethod: R.reduce((lookup, result) => {
        // const { attributes, key, match, variable } = result;
        const { key } = result;

        lookup[key] = {
          selected: "", // "choose", "new", "ignore", or ""
          resolvedBy: null, // type, display, data
          choose: {
            query: key,
            onQueryUpdate: this.handleChooseQueryUpdate(key),
            onVariableSelect: this.handleChooseVariableSelect(key),
          },
          new: {
            name: key,
            onNameChange: this.handleNewNameChange(key),
            onSubmit: this.handleNewSubmit(key)
          },
          ignore: {
            onResetClick: this.handleMethodReset(key)
          }
        };

        return lookup;
      }, {})(this.props.results)
    });
  }


  // tab change
  handleMethodChange = R.memoize((key) => (method) => {
    const { resolveMethod } = this.state;

    const selectedLens = R.lensPath([key, "selected"]);

    // immediately resolve when ignore is clicked
    if (method === "ignore"){
      const resolvedBy = {
        type: "ignore",
        display: "",
        data: null
      };

      this.setState({
        resolveMethod: this.resolveWith(key, resolvedBy, resolveMethod)
      });
    }
    // otherwise, change the selected method
    else {
      this.setState({
        resolveMethod: R.set(selectedLens, method, resolveMethod)
      });
    }
  })


  handleMethodReset = R.memoize((key) => () => {
    this.handleMethodChange(key)("");
  })


  handleChange = R.memoize((key) => () => {
    const { resolveMethod } = this.state;

    const resolvedByLens = R.lensPath([key, "resolvedBy"]);

    this.setState({
      resolveMethod: R.set(resolvedByLens, null, resolveMethod)
    });
  })

  // resolve and clear selected
  resolveWith = R.curry((key, resolvedBy, resolvedMethod) => {

    const selectedLens   = R.lensPath([key, "selected"]);
    const resolvedByLens = R.lensPath([key, "resolvedBy"]);

    return R.compose(
      R.set(selectedLens, ""),
      R.set(resolvedByLens, resolvedBy)
    )(resolvedMethod);

  })

  /* choose */

  handleChooseQueryUpdate = R.memoize((key) => (query) => {
    const { resolveMethod } = this.state;

    const queryLens = R.lensPath([key, "choose", "query"]);

    this.setState({
      resolveMethod: R.set(queryLens, query, resolveMethod)
    });
  })

  handleChooseVariableSelect = R.memoize((key) => (variable) => {

    const { resolveMethod } = this.state;

    const queryLens = R.lensPath([key, "choose", "query"]);

    const resolvedBy = {
      type: "choose",
      display: variable.name,
      data: variable
    };

    this.setState({
      resolveMethod: R.compose(
        R.set(queryLens, variable.name),
        this.resolveWith(key, resolvedBy)
      )(resolveMethod)
    });
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
                  onStartOver={this.handleChange(key)}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

}
