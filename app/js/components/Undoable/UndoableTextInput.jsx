import React from "react";

import { func, string } from "prop-types";

export default class UndoableTextInput extends React.Component {

  static propTypes = {
    value: string.isRequired,
    onChange: func.isRequired
  }

  state = {
    past: [],
    present: "",
    future: []
  }

  componentDidMount = () => {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps = (nextProps) => {

    this.setState({
      present: nextProps.value
    });
  }

  render = () => {

    const { onChange } = this.props;
    const { present } = this.state;


    return (
      <div className="undoable">
        <input type="text" value={present} onChange={(e) => onChange(e.target.value, e)} />
      </div>
    );
  }
}
