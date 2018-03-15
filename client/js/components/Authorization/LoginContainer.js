import R from "ramda";
import Login from "./Login.jsx";
import { graphql } from "react-apollo";
import gql from "graphql-tag";


// https://www.howtographql.com/react-apollo/5-authentication/
const loginMutation = gql`
  mutation login($email: String!, $password: String!){
    authentication {
      login(email: $email, password: $password)
    }
  }
`;


export default R.compose(
  graphql(loginMutation, { name: "loginMutation" })
)(Login);
