import R from "ramda";
import { graphql, gql } from "react-apollo";
import Dataset from "./Dataset.jsx";
import DatasetNotUndoable from "./DatasetNotUndoable.jsx";
import Fetchable from "../Fetchable/Fetchable.jsx";

const query = gql`query datasetById($id:Int){
  entities {
    dataSet(id: $id) {
      id
      name
    }
  }
}`;


const mapResultsToProps = ({ ownProps, data }) => {
  return {
    dataset: R.defaultTo([], R.path(["entities","dataSet", 0], data)),
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
)(DatasetNotUndoable);
