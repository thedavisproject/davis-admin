import React from "react";
import R from "ramda";
import Modal from "../Modal/Modal.jsx";
import classNames from "classnames";

import { func, node, string } from "prop-types";

export default class ConfirmBtn extends React.Component {

  static propTypes = {
    onConfirm: func.isRequired,
    children: node.isRequired,
    renderMessage: func.isRequired,
    confirmLabel: string,
    cancelLabel: string,
    className: string
  };

  static defaultProps = {
    confirmLabel: "Confirm",
    cancelLabel: "Cancel"
  }

  state = {
    isOpen: false
  }

  componentDidUpdate = (prevProps, prevState) => {

    if (this.state.isOpen){
      document.addEventListener("keyup", this.listenForEnter);
    }
    else {
      document.removeEventListener("keyup", this.listenForEnter);
    }
  }

  handleClick = e => {
    this.setState({
      isOpen: true
    });
  }

  handleClose = () => {
    this.setState({
      isOpen: false
    });
  }

  listenForEnter = (e) => {
    // Enter
    if (e.which === 13){
      this.handeConfirm();
    }
  }

  handeConfirm = () => {
    this.props.onConfirm();
  }

  render = () => {

    const { isOpen } = this.state;
    const { children, renderMessage, confirmLabel, cancelLabel, className, ...otherProps } = this.props;

    return (
      <div className={classNames("confirm-btn", className)} {...R.omit(["onConfirm"], otherProps)}>
        <button type="button" onClick={this.handleClick}>{children}</button>

        <Modal isOpen={isOpen} onClose={this.handleClose}>
          {renderMessage()}

          <div className="modal__footer">
            <button type="button" onClick={this.handeConfirm}>{confirmLabel}</button>
            <button type="button" onClick={this.handleClose}>{cancelLabel}</button>
          </div>
        </Modal>
      </div>
    );
  }

}
