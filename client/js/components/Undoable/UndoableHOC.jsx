import React from "react";
import { any, func, string } from "prop-types";
import { createHistory, update, redo, undo } from "./undoableHelpers.js";


/**
 * Higher order component to create an Undoable version of a field component
 * @param {Func} renderValue (value, onChange, props -> component)
 * @returns {Func} React component
 */
const UndoableHOC = (renderValue) => {

  return class UndoableField extends React.Component {

    static propTypes = {
      label: string.isRequired,
      value: any.isRequired,
      onChange: func.isRequired
    };

    state = {
      history: createHistory(this.props.value)
    }


    componentWillReceiveProps = (nextProps) => {

      // update the value if we've received a new one
      if (nextProps.value !== this.state.history.present){

        console.log("undoable new value:", nextProps.value);
        this.handleValueChange(nextProps.value);
      }
    }

    componentDidUpdate = (prevProps, prevState) => {

      const { onChange } = this.props;
      const prevStateValue = prevState.history.present;
      const propsValue = this.props.value;
      const value = this.state.history.present;

      if (prevStateValue !== value && propsValue !== value && onChange){
        onChange(value);
      }

    }


    handleValueChange = (newValue) => {

      const { history } = this.state;

      this.setState({
        history: update(history, newValue)
      });
    }


    handleRedoClick = () => {
      const { history } = this.state;

      this.setState({
        history: redo(history)
      });
    }


    handleUndoClick = () => {
      const { history } = this.state;

      this.setState({
        history: undo(history)
      });
    }


    render = () => {

      // remove label, value, onChange
      // eslint-disable-next-line no-unused-vars
      const { label, value, onChange, ...rest } = this.props;
      const { history } = this.state;


      return (
        <div className="undoable">
          <div className="undoable__top">
            <label className="undoable__label">{label}</label>
            <div className="undo-btns undoable__undo-btns">
              <button
                type="button"
                disabled={(history.past.length < 1)}
                className="btn--undo"
                onClick={this.handleUndoClick}
              >
                undo
              </button>
              <button
                type="button"
                disabled={(history.future.length < 1)}
                className="btn--redo"
                onClick={this.handleRedoClick}
              >
                redo
              </button>
            </div>
          </div>
          <div className="undoable__field">
            {renderValue(history.present, this.handleValueChange, rest)}
          </div>

        </div>
      );
    };
  };
};

export default UndoableHOC;
