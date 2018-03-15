import React from "react";
import R from "ramda";
import { func, string } from "prop-types";
import { setAuthCookie } from "./cookie.js";
import { Redirect } from "react-router-dom";

/* see https://reacttraining.com/react-router/web/example/auth-workflow */

export default class Login extends React.Component {

  static propTypes = {
    loginMutation: func.isRequired,
    from: string.isRequired
  }

  state = {
    error: null,
    loading: false,
    redirectToReferrer: false
  }

  componentDidMount = () => {
    this.email.focus();
  }

  handleSubmit = e => {
    const { loginMutation } = this.props;

    e.preventDefault();

    const formData = new FormData(e.target);
    const variables = R.fromPairs(Array.from(formData));

    this.setState({ loading: true });

    loginMutation({ variables })
      .then((res) => {

        // set the authentication token cookie
        const token = R.path(["data", "authentication", "login"], res);
        setAuthCookie(token);

        this.setState({
          loading: false,
          redirectToReferrer: true
        });
      })
      .catch((error) => {

        // eslint-disable-next-line no-unused-vars
        const { graphQLErrors, networkError, message, extraInfo } = error;

        const errorMessage = R.path(["graphQLErrors", 0, "message"], error) || message;

        this.setState({
          error: errorMessage,
          loading: false
        });
      });
  };

  render = () => {

    const { from } = this.props;
    const { loading, error, redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div>
        <h1>Davis</h1>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <label>
              Email <input name="email" type="text" ref={el => this.email = el}/>
            </label>
          </fieldset>

          <fieldset>
            <label>
              Password <input name="password" type="password" />
            </label>
          </fieldset>

          {error && (
            <div>{error}</div>
          )}

          <fieldset>
            <button type="submit" disabled={loading}>{
              loading ? "loading..." : "Submit"
            }</button>
          </fieldset>
        </form>
      </div>
    );
  };
}
