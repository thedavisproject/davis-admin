import { graphql, gql } from "react-apollo";
import { connect } from "react-redux";
import R from "ramda";

import {
  initResolverState,
  selectMethod,
  clearMethod
} from "../redux/resolverStateActions.js";

import Resolver from "./Resolver.jsx";
import Fetchable from "../../Fetchable/Fetchable.jsx";

const analyzeFileQuery = gql`
  query analyzeFile($datasetId: Int!, $fileId: String!) {
    data {
      analyze(dataSet: $datasetId, fileId: $fileId, valueLimit: 0) {
        key
        match
        variable {
          id
          name
        }
        values {
          value
          match
          attribute {
            id
            name
          }
        }
      }
    }
  }
`;

const createNewVariablesMutation = gql`
  mutation createNewVariables($variables: [VariableCreate]){
    entities {
      create {
        variables(variables: $variables) {
          id, key
        }
      }
    }
  }
`;

const importMutation = gql`
  mutation import($dataSet: Int!, $fileId: String!, $columnMappings: JSON!) {
    data {
      import(dataSet: $dataSet, fileId: $fileId, columnMappings: $columnMappings, createMissingAttributes: true) {
        id
        __typename
      }
      __typename
    }
  }
`;


export default R.compose(

  graphql(createNewVariablesMutation, {
    props: ({ ownProps, mutate }) => {
      return {
        createNewVariables: (variables) => {
          // the first variables is the graphql syntax, the 2nd is our payload
          return mutate({ variables: { variables } });
        }
      };
    },
    alias: "withCreateNewVariables"
  }),

  graphql(importMutation, {
    props: ({ ownProps, mutate }) => {

      const { datasetId, fileId, createNewVariables } = ownProps;

      // run the import mutation with the given columnMappings
      const runImport = (columnMappings) => {
        return mutate({
          variables: {
            dataSet: datasetId,
            fileId: fileId,
            columnMappings: JSON.stringify(columnMappings)
          }
        })
        .then(response => {
          console.log("import response:", response);
        });
      };

      // Array -> Object
      // eg. [ {id, key}, ... ] -> {key1: id1, ... }
      const variablesToMap = R.compose(
        R.fromPairs,
        R.map(({ id, key }) => [key, id]),
      );

      return {
        onImport: (resolverState) => {

          const resolvedBy = R.compose(
            R.values,
            R.map(R.prop("resolvedBy"))
          )(resolverState);


          // find all the "new" variables
          // Array -> Array of { name, type }
          const newVariables = R.compose(
            R.map(R.compose(
              // TODO can remove this when graphql updates to automatically generate the key
              data => ({ ...data, key: data.name }),
              R.prop("data") // { name, type }
            )),
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
            createNewVariables(newVariables)
              .then((response) => {

                // { key1: id1, key2: id2, ... }
                const newVariableMap = R.compose(
                  variablesToMap,
                  R.path(["data", "entities", "create", "variables"])
                )(response);

                runImport({ ...newVariableMap, ...existingVariableMap });
              });
          }
          else if (Object.keys(existingVariableMap).length > 0) {
            runImport(existingVariableMap);
          }
          else {
            throw new Error("Are you ignoring all the variable?");
          }
        }
      };

    },
    alias: "withImport"
  }),


  graphql(analyzeFileQuery, {
    props: ({ ownProps, data }) => {

      return {
        results: R.path(["data", "analyze"], data),
        loading: data.loading,
        error: data.error
      };

    },
    options: (props) => ({
      variables: {
        datasetId: props.datasetId,
        fileId: props.fileId
      }
    }),
    alias: "withAnalyzeFile"
  }),

  connect(
    function mapStateToProps(state){
      return {
        resolverState: state.import.resolverState
      };
    },
    function mapDispatchToProps(dispatch, ownProps){
      return {
        // this is a hack to get the data from apollo to redux...
        initResolverState: (results) => dispatch(initResolverState(results)),
        onMethodSelect: (key, method) => dispatch(selectMethod(key, method)),
        onMethodClear: (key) => dispatch(clearMethod(key))
      };
    }
  ),

  // wrap this component in Fetchable
  Fetchable

)(Resolver);
