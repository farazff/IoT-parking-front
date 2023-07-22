import React from "react";
import { Modal, Button } from "react-bootstrap";
import { ConfirmDataModalProps } from "./ConfirmDataModal.props";

const ConfirmDataModal = React.memo<ConfirmDataModalProps>(
  ({ modalText, confirmFunc, setShowModal, showModal }) => {
    return (
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="py-4 mb-4 justify-content-end d-flex">
          {modalText}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center w-100">
          <Button variant="dark" onClick={confirmFunc}>
            تایید
          </Button>
          <Button variant="dark-outline" onClick={() => setShowModal(false)}>
            انصراف
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
);

export default ConfirmDataModal;
