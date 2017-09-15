import { connect } from "react-redux";
import R from "ramda";

import New from "./New.jsx";
import Fetchable from "../../Fetchable/Fetchable.jsx";

import { updateName, submitNewVariable } from "../redux/newActions.js";


export default R.compose(

  connect(
    function mapStateToProps(state, ownProps){
      return {};
    },
    function mapDispatchToProps(dispatch, ownProps){

      const key = ownProps.columnHeader; // key is a reserved prop

      return {
        onNameChange: (name) => dispatch(updateName(key, name)),
        onSubmit: (name) => dispatch(submitNewVariable(key))
      };
    }
  ),

  // wrap this component in Fetchable
  Fetchable

)(New);
