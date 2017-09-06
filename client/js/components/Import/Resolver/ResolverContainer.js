import { graphql, gql } from "react-apollo";
import R from "ramda";

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


export default R.compose(
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

  // wrap this component in Fetchable
  Fetchable

)(Resolver);
