import React, { Component } from "react";
import { createPortal } from "react-dom";
import { Overlay, ModalDiv } from "./Modal.styled";
import PropTypes from 'prop-types';
const modalRoot = document.querySelector("#modal-root");

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

    handleBackdropClick = e => {
        if (e.target === e.currentTarget) {
            this.props.onClose();
        }
  }
  render() {
    const { imgUrl, alt } = this.props;
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalDiv>
          <img src={imgUrl} alt={alt} />
        
        </ModalDiv>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  imgUr: PropTypes.string,
  alt: PropTypes.string.isRequired,
  onClose:PropTypes.func.isRequired
}