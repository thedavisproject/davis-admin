import R from "ramda";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Variable from "./Variable.jsx";
import Fetchable from "../Fetchable/Fetchable.jsx";

const query = gql`
  query variableById($id: Int!){
    entities {
      variable(id: $id) {
        id
        name
      }
    }
  }
`;

const mapResultsToProps = ({ ownProps, data }) => {
  return {
    variable: R.defaultTo([], R.path(["entities","variable"], data)),
    loading: data.loading,
    error: data.error
  };
};

const mapPropsToOptions = (props) => {

  const { id } = props;

  return {
    variables: { id }
  };
};

export default R.compose(
  graphql(query, {
    props: mapResultsToProps,
    options: mapPropsToOptions
  }),
  Fetchable
)(Variable);
