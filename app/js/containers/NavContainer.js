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
    onNavClick: (page, id, args) => {
      dispatch(navigateTo(page, id, args));
    }
  };
}


export default connect(mapStateToProps, mapStateToDispatch)(Nav);
