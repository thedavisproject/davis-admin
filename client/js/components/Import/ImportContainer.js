import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";
import R from "ramda";

import {
  setDatasetId, uploadStart, uploadSuccess
}  from "./redux/importActions.js";

import Import from "./Import.jsx";


/** TODO have joel update graphql so we can use this instead
    is this possible?

  mutation submitDatasetName($name: String) {
    entities {
      create(entities: [{
        name: $name,
        entityType: "dataset"
      }]){
        id
        name
      }
    }
  }
*/
const submitDatasetNameMutation = gql`
  mutation submitDataset($entity: EntityCreate) {
    entities {
      create(entities: [$entity]) {
        id
        name
      }
    }
  }
`;


export default R.compose(

  connect(
    function mapStateToProps(state){
      return R.pick([
        "datasetId", "datasetName", "fileId", "fileUploading"
      ])(state.import);
    },
    function mapDispatchToProps(dispatch){
      return {
        // onDatasetSubmit:
        onDatasetSubmitSuccess: (id) => dispatch(setDatasetId(id)),
        onUploadStart: () => dispatch(uploadStart()),
        onUploadSuccess: (fileId) => dispatch(uploadSuccess(fileId))
      };
    }
  ),

  graphql(submitDatasetNameMutation, {
    props: ({ ownProps, mutate }) => {

      return {
        // TODO have a loading indicator for this
        // https://github.com/apollographql/react-apollo/issues/421
        onDatasetSubmit: (name) => {

          return mutate({
            variables: {
              entity: {
                name: name,
                entityType: "dataset"
              }
            }
          })
          .then(({ data }) => {
            // console.log("success!",  data);
            return data;
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.log("error", error);
          });
        }
      };
    }
  })

)(Import);
