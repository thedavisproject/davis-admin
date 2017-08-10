import React from "react";
import { createHistory, update, redo, undo } from "./undoableHelpers.js";

import { any, array, func, shape, string } from "prop-types";

export const historyType = shape({
  past: array,
  present: any,
  future: array
});

export default class UndoableTextInput extends React.Component {

  static propTypes = {
    value: string.isRequired,
    onChange: func.isRequired
  }


  state = {
    history: createHistory(this.props.value)
  }


  componentDidMount = () => {
    this.componentWillReceiveProps(this.props);
  }


  componentWillReceiveProps = (nextProps) => {

  }


  componentDidUpdate = (prevProps, prevState) => {
    const { onChange } = this.props;
    // if (onChange){
    //   onChange(e.target.value, e);
    // }
  }


  handleValueChange = (e) => {

    const { history } = this.state;

    this.setState({
      history: update(history, e.target.value)
    });
  }


  handleRedoClick = (e) => {
    const { history } = this.state;

    this.setState({
      history: redo(history)
    });
  }


  handleUndoClick = (e) => {
    const { history } = this.state;

    this.setState({
      history: undo(history)
    });
  }


  render = () => {

    const { history } = this.state;

    return (
      <div className="undoable">
        <div className="undoable__top">
          <label className="undoable__label">Name</label>
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
          <input type="text" value={history.present} onChange={this.handleValueChange} />
        </div>

      </div>
    );
  }
}
