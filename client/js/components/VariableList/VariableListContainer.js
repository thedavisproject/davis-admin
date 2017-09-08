import R from "ramda";
import { graphql, gql } from "react-apollo";
import VariableList from "./VariableList.jsx";
import Fetchable from "../Fetchable/Fetchable.jsx";

const query = gql`
  query {
    entities {
      variables {
        id
        name
      }
    }
  }
`;


const mapResultsToProps = ({ ownProps, data }) => {
  return {
    variables: R.defaultTo([], R.path(["entities", "variables"], data)),
    loading: data.loading,
    error: data.error
  };
};

export default R.compose(
  graphql(query, {
    props: mapResultsToProps
  }),
  Fetchable
)(VariableList);
