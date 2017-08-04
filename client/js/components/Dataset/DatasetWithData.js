import R from "ramda";
import { graphql, gql } from "react-apollo";
import DatasetNotUndoable from "./DatasetNotUndoable.jsx";
import Fetchable from "../Fetchable/Fetchable.jsx";


export default R.compose(

  // load the data
  graphql(gql`
    query datasetById($id: Int){
      entities {
        dataSet(id: $id) {
          id
          name
        }
      }
    }
  `, {
    props: ({ ownProps, data }) => ({
      dataset: R.defaultTo([], R.path(["entities","dataSet", 0], data)),
      loading: data.loading,
      error: data.error
    }),
    options: (props) => ({
      variables: {
        id: props.id
      }
    })
  }),

  // mutation to update the dataset
  graphql(gql`
    mutation updateDataset($entity: EntityUpdate) {
      entities {
        update(entities: [$entity]) {
          id
          name
        }
      }
    }
  `, {
    props: ({ ownProps, mutate }) => ({

      /**
       * @param {Object} fields key/values of fields of the dataset to update
       * @returns {Nothing} will mutate the dataset in graphql
       */
      onDatasetUpdate: (fields) => {

        // id and entityType are required to select the correct entity
        // combine them the given fields
        const variables = {
          entity: R.merge(fields, {
            id: ownProps.id,
            entityType: "dataset"
          })
        };

        // update!
        mutate({ variables })
          // .then(data => {
          //   console.log("data", data);
          // })
          .catch(error => {
            console.log("error", error);
          });
      }
    })
  }),

  // wrap this component in Fetchable
  Fetchable

)(DatasetNotUndoable);
