import { graphql, gql } from "react-apollo";
import R from "ramda";

import Import from "./Import.jsx";


/** TODO have joel update graphql so we can use this instead
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
  graphql(submitDatasetNameMutation, {
    props: ({ ownProps, mutate }) => {
      return {
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
            console.log("success!",  data);
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
