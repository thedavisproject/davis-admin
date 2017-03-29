import { connect } from "react-redux";

import Nav from "../components/Nav/Nav.jsx";

function mapStateToProps(state, ownProps) {
  return {
    pageId: state.route.page
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(Nav);
