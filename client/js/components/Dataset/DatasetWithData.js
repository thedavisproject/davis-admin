import R from "ramda";
import { graphql, gql, withApollo } from "react-apollo";
import Dataset from "./Dataset.jsx";
import Fetchable from "../Fetchable/Fetchable.jsx";
import debounce from "lodash.debounce";
import createOneAtATimeQueue from "../../oneAtATimeQueue.js";

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


// use { id } as the response (instead of { id, name, ... }) so it doesn't update
// the apollo cache with potenially already stale values
const updateDatasetMutation = gql`
  mutation updateDataset($entity: EntityUpdate) {
    entities {
      update(entities: [$entity]) {
        id
      }
    }
  }
`;


const queue = createOneAtATimeQueue();

const debouncedPersist = debounce((mutate, variables, newDataset) => {

  console.log("debounce: ", newDataset.name);

  return queue.enqueue(() => {

    console.log("mutating!", newDataset.name);

    return mutate({
      variables,
      // optimisticResponse: {
      //   entities: {
      //     __typename: "EntityMutation",
      //     update: [ newDataset ]
      //   }
      // },
    })
    .then(({ data }) => {
      console.log("   written:", data.entities.update[0].name);
    })
    .catch(error => {
      console.log("error", error);
    });
  });
}, 400);


export default R.compose(

  // attach the ApolloClient to props.client
  withApollo,

  // load the data
  graphql(dataSetByIdQuery, {
    props: ({ ownProps, data }) => ({
      dataset: R.defaultTo([], R.path(["entities","dataSet"], data)),
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
  graphql(updateDatasetMutation, {
    props: ({ ownProps, mutate }) => {

      const { client } = ownProps;

      /**
       * @param {Object} fields key/values of fields of the dataset to update
       * @returns {Nothing} will mutate the dataset in graphql
       */
      const onDatasetUpdate = (fields) => {

        // id and entityType are required to select the correct entity
        // combine them with the given fields
        const variables = {
          entity: R.merge(fields, {
            id: ownProps.id,
            entityType: "dataset"
          })
        };

        const newDataset = R.merge(ownProps.dataset, fields);

        debouncedPersist(mutate, variables, newDataset);

        // super optimistic, using this instead of optimisticResponse in mutate
        // because we're debouncing the mutation
        client.writeQuery({
          query: dataSetByIdQuery,
          data: {
            entities: {
              __typename: "EntityQuery",
              dataSet: newDataset
            }
          },
          variables
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
