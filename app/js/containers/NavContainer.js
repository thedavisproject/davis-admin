import { connect } from "react-redux";
import { navigateTo } from "../redux/routing/routing-actions.js";

import Nav from "../components/Nav/Nav.jsx";

function mapStateToProps(state, ownProps) {
  return {
    route: state.route
  };
}

function mapStateToDispatch(dispatch) {
  return {
    onNavClick: (page, id, params) => {
      dispatch(navigateTo(page, id, params));
    }
  };
}


export default connect(mapStateToProps, mapStateToDispatch)(Nav);
