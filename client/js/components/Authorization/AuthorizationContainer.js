import R from "ramda";
import Authorization from "./Authorization.jsx";
import Fetchable from "../Fetchable/Fetchable.jsx";
import Cookie from "js-cookie";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { AUTH_COOKIE } from "./cookie.js";



const authQuery = gql`
  query authenticate($token: String!){
    authentication {
      hasGuiAccess(token:$token)
    }
  }
`;


export default R.compose(
  graphql(authQuery, {

    // don't run this query if we don't have a token cookie
    skip: (props) => R.isNil(Cookie.get(AUTH_COOKIE)),

    options: (props) => {
      return {
        variables: {
          token: Cookie.get(AUTH_COOKIE)
        },
      };
    },

    props: ({ ownProps, data }) => {

      // if something gets messed up, remove the cookie
      if (!R.isNil(R.prop("error", data))){
        Cookie.remove(AUTH_COOKIE);
      }

      return {
        isAuthorized: R.defaultTo(false, R.path(["authentication", "hasGuiAccess"], data)),
        loading: data.loading,
        error: data.error
      };
    }
  }),
  Fetchable
)(Authorization);
