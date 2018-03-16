import React from "react";
import ResolverRow from "./ResolverRow.jsx";
import R from "ramda";

import {
  any, arrayOf, bool, func, number, objectOf, oneOf, shape, string
} from "prop-types";


export default class Resolver extends React.Component {

  static propTypes = {
    datasetId: number.isRequired,
    fileId: string.isRequired,
    initResolverState: func.isRequired,
    onMethodSelect: func.isRequired,
    onMethodClear: func.isRequired,
    importMutation: func.isRequired,
    createNewVariablesMutation: func.isRequired,
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


  state = {
    loading: false,
    error: null
  }


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

    const { resolverState, datasetId, fileId, createNewVariablesMutation, importMutation } = this.props;

    this.setState({
      loading: true
    });

    // getErrorMessage : String -> ErrorObject -> String
    // usage: getErrorMessage("default message", errorObj);
    const getErrorMessage = R.curry(
      (defaultErrorMsg, errorObj) =>
        R.reduce(R.either, R.F, [
          R.path(["graphQLErrors", 0, "message"]),
          R.prop("message"),
          R.always(defaultErrorMsg)
        ])(errorObj)
    );

    // run the import mutation with the given columnMappings
    const runImport = (columnMappings) => {

      return importMutation({
        variables: {
          dataSet: datasetId,
          fileId: fileId,
          columnMappings
        }
      })
      .then(response => {
        this.setState({
          error: null,
          loading: false
        });
      })
      .catch((error) => {

        console.dir(error); // eslint-disable-line no-console

        this.setState({
          error: getErrorMessage("There was an error importing", error),
          loading: false
        });

      });
    };

    // Array -> Array
    // eg. [ {id, key}, ... ] -> [ { column, variable }, ... ]
    const variablesToMap = R.map(
      ({ id, key }) => ({
        column: key,
        variable: id
      })
    );

    const submitImport = (resolverState) => {

      const resolvedBy = R.compose(
        R.values,
        R.map(R.prop("resolvedBy"))
      )(resolverState);

      // find all the "new" variables
      // Array -> Array of { name, type }
      const newVariables = R.compose(
        R.map(R.prop("data")), // { name, type }
        R.filter(R.propEq("type", "new"))
      )(resolvedBy);


      // { key1: id1, ... }, could be empty {}
      const existingVariableMap = R.compose(
        variablesToMap,
        R.map(R.prop("data")),
        R.filter(R.propEq("type", "choose"))
      )(resolvedBy);


      if (newVariables.length > 0){

        // graphql mutation
        // the first variables is the graphql syntax, the 2nd is our payload
        createNewVariablesMutation({ variables: { variables: newVariables } })
          .then((response) => {

            // { key1: id1, key2: id2, ... }
            const newVariableMap = R.compose(
              variablesToMap,
              R.path(["data", "entities", "create", "variables"])
            )(response);

            return runImport([ ...newVariableMap, ...existingVariableMap ]);
          })
          .catch((error) => {

            console.dir(error); // eslint-disable-line no-console

            this.setState({
              error: getErrorMessage("There was an error creating new variables", error),
              loading: false
            });
          });
      }
      else if (Object.keys(existingVariableMap).length > 0) {
        runImport(existingVariableMap);
      }
      else {
        throw new Error("Are you ignoring all the variables?");
      }
    };

    submitImport(resolverState);

  }


  /* render */

  render = () => {

    const { error, loading } = this.state;
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

        { error && (
          <div>{error}</div>
        )}

        <button
          type="button"
          disabled={!isResolved || loading}
          title={!isResolved ? "Some variables are not resolved" : ""}
          onClick={this.handleImport}
        >
          {loading ? "loading..." : "Import"}
        </button>
      </div>
    );
  };

}
