import { graphql, gql } from "react-apollo";
import R from "ramda";

import ResolveChoose from "./ResolveChoose.jsx";
import Fetchable from "../../Fetchable/Fetchable.jsx";

const variableSearch = gql`
  query search($query: JSON) {
    entities {
      variables(query: $query) {
        key
        name
      }
    }
  }
`;


export default R.compose(
  graphql(variableSearch, {

    // don't load if the query length is short
    // skip: (props) => {
    //   return props.query.length <= 2;
    // },

    props: ({ ownProps, data }) => {

      return {
        variables: R.path(["entities", "variables"], data),
        loadingResults: data.loading,
        loading: false,   // for Fetchable
        error: data.error // for Fetchable
      };
    },
    options: (props) => {
      return  {
        variables: {
          // https://github.com/thedavisproject/davis-model/blob/master/docs/entityQuery.md
          query: ["or",
            ["like", "name", props.query],
            ["like", "key", props.query]
          ]
        }
      };
    }
  }),

  // wrap this component in Fetchable
  Fetchable

)(ResolveChoose);
