import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Overlay, ModalDiv } from "./Modal.styled";
import PropTypes from 'prop-types';
const modalRoot = document.querySelector("#modal-root");

export const Modal = ({imgUrl, alt, onClose})=>{

  useEffect(() => {

  const handleKeyDown = e => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);  
    };

   },[onClose]);


const handleBackdropClick = e => {
        if (e.target === e.currentTarget) {
            onClose();
        }
  }
  
    return createPortal(
      <Overlay onClick={handleBackdropClick}>
        <ModalDiv>
          <img src={imgUrl} alt={alt} />
        
        </ModalDiv>
      </Overlay>,
      modalRoot
    );
  
}

Modal.propTypes = {
  imgUr: PropTypes.string,
  alt: PropTypes.string.isRequired,
  onClose:PropTypes.func.isRequired
}

