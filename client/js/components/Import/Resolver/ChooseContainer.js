import { graphql, gql } from "react-apollo";
import { connect } from "react-redux";
import R from "ramda";

import Choose from "./Choose.jsx";
import Fetchable from "../../Fetchable/Fetchable.jsx";

import { updateQuery, selectVariable } from "../redux/chooseActions.js";

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

  connect(
    function mapStateToProps(state, ownProps){

      const key = ownProps.columnHeader; // key is a reserved prop
      const { query } = state.import.resolverState[key].choose;

      return {
        // query
      };
    },
    function mapDispatchToProps(dispatch, ownProps){

      const key = ownProps.columnHeader; // key is a reserved prop

      return {
        onQueryUpdate: (query) =>dispatch(updateQuery(key, query)),
        onVariableSelect: (variable) => dispatch(selectVariable(key, variable))
      };
    }
  ),

  // wrap this component in Fetchable
  Fetchable

)(Choose);
