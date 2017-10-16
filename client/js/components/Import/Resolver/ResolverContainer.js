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
      analyze(dataSet: $datasetId, fileId: $fileId) {
        key
        match
        variable {
          id
          name
        }
        attributes {
          key
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

const importMutation = gql`
  mutation import($entities: [EntityCreate]){
    entities{
      create(entities: $entities) {
        id
        name
        entityType
      }
    }
}
`;


export default R.compose(

  graphql(importMutation, {
    props: ({ ownProps, mutate }) => {

      return {
        onImport: (resolverState) => {
          const schema = R.compose(
            R.map(R.prop("resolvedBy"))
          )(resolverState);

          console.log(schema);
        }
      }
    }
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
    })
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
