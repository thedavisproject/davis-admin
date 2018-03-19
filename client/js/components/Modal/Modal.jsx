import React from "react";
import classNames from "classnames";

import { bool, func, node } from "prop-types";


export default class Modal extends React.Component {

  static propTypes = {
    isOpen: bool.isRequired,
    onClose: func.isRequired,
    children: node
  };

  static defaultProps = {
    isOpen: false
  };


  componentDidUpdate = (prevProps, prevState) => {
    const body = document.querySelector("body");

    if (this.props.isOpen){
      body.classList.add("modal-is-open");
      document.addEventListener("keyup", this.listenForEsc);
    }
    else {
      body.classList.remove("modal-is-open");
      document.removeEventListener("keyup", this.listenForEsc);
    }
  }

  listenForEsc = (e) => {
    // Escape
    if (e.which === 27){
      this.props.onClose();
    }
  }

  // keep track of what is in the modal so we can keep that while the modal
  // is fading out
  childrenCache = null

  render = () => {

    const { isOpen, onClose, children } = this.props;

    const modalClasses = classNames("modal", {
      "is-open": isOpen
    });

    if (children){
      this.childrenCache = children;
    }

    return (
      <div className={modalClasses}>
        <div className="modal__overlay" onClick={onClose} />
        <div className="modal__box">
          <button type="button" className="modal__close" onClick={onClose}>
            <svg height="32" className="octicon octicon-x" viewBox="0 0 12 16" version="1.1" width="24" aria-hidden="true">
              <path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z" />
            </svg>
          </button>
          {children || this.childrenCache}
        </div>
      </div>
    );
  };
}
