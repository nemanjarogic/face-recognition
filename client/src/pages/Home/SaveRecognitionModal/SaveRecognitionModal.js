import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import "./SaveRecognitionModal.css";

const SaveRecognitionModal = props => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Save Recognition
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Form</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          id="btn-close-modal"
          variant="outline-dark"
          onClick={props.onHide}
        >
          Close
        </Button>
        <Button variant="dark" onClick={props.onHide}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SaveRecognitionModal;
