import R from "ramda";
import { graphql, gql } from "react-apollo";
import DatasetList from "./DatasetList.jsx";
import Fetchable from "../Fetchable/Fetchable.jsx";

const query = gql`{
  entities {
    dataSets {
      id
      name
    }
  }
}`;


const mapResultsToProps = ({ ownProps, data }) => {
  return {
    datasets: R.defaultTo([], R.path(["entities", "dataSets"], data)),
    loading: data.loading,
    error: data.error
  };
};

export default R.compose(
  graphql(query, {
    props: mapResultsToProps
  }),
  Fetchable
)(DatasetList);
