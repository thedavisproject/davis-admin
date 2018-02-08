import R from "ramda";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Dataset from "./Dataset.jsx";
import Fetchable from "../Fetchable/Fetchable.jsx";
import debounce from "lodash.debounce";

const dataSetByIdQuery = gql`
  query datasetById($id: Int!){
    entities {
      dataSet(id: $id) {
        id
        name
      }
    }
  }
`;


const updateDatasetMutation = gql`
  mutation updateDataset($dataSet: DataSetUpdate) {
    entities {
      update {
        dataSets(dataSets: [$dataSet]){
          id
          name
        }
      }
    }
  }
`;


export default R.compose(


  // load the data
  graphql(dataSetByIdQuery, {
    options: (props) => ({
      variables: {
        id: props.id
      }
    }),
    props: ({ ownProps, data }) => ({
      dataset: R.defaultTo([], R.path(["entities","dataSet"], data)),
      loading: data.loading,
      error: data.error
    })
  }),

  // mutation to update the dataset
  graphql(updateDatasetMutation, {
    props: ({ ownProps, mutate }) => {

      /**
       * @param {Object} fields key/values of fields of the dataset to update
       * @returns {Promise} will mutate the dataset in graphql
       */
      const onDatasetUpdate = (fields) => {

        // id and entityType are required to select the correct entity
        // combine them with the given fields
        const variables = {
          dataSet: R.merge(fields, {
            id: ownProps.id,
            entityType: "dataset"
          })
        };

        const newDataset = R.merge(ownProps.dataset, fields);

        return mutate({
          variables,
          optimisticResponse: {
            entities: {
              update: {
                dataSets: [ newDataset ],
                __typename: "EntityUpdate"
              },
              __typename: "EntityMutation"
            }
          }
        })
        .then(({ data }) => {
          // console.log("   written:", data.entities.update[0].name);
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log("error", error);
        });

      };

      return {
        onDatasetUpdate: debounce(onDatasetUpdate, 0)
      };
    }
  }),


  // wrap this component in Fetchable
  Fetchable

)(Dataset);
