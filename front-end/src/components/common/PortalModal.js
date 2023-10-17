import React from "react";
import { createPortal } from "react-dom";
import * as Modal from "./PortalModal.style";

function PortalModal({
  children,
  handleShowModal,
  size,
  container = document.body,
}) {
  return (
    <>
      {handleShowModal &&
        createPortal(
          <Modal.Background>
            <Modal.Wrap>
              <Modal.Box size={size}>{children}</Modal.Box>
            </Modal.Wrap>
          </Modal.Background>,
          container
        )}
    </>
  );
}

export default PortalModal;
