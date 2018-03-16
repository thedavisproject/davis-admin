import { graphql } from "react-apollo";
import gql from "graphql-tag";
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
  mutation import($dataSet: Int!, $fileId: String!, $columnMappings: [DataImportColumnMapping]!) {
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
    name: "createNewVariablesMutation",
    alias: "withCreateNewVariables"
  }),

  graphql(importMutation, {
    name: "importMutation",
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
