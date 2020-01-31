import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./SaveRecognitionModal.css";

const SaveRecognitionModal = ({ show, onHide, onSaveRecognitionsSubmit }) => {
  const [description, setDescription] = useState("");

  const onDesciptionChange = event => {
    setDescription(event.target.value);
  };

  const onSaveRecognitionsClick = () => {
    onHide();
    onSaveRecognitionsSubmit(description);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Save Recognition
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Please enter photo description to save recognized faces to profile.
        </p>
        <Form.Control
          id="input-description"
          type="text"
          placeholder="Description"
          onChange={onDesciptionChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button id="btn-close-modal" variant="outline-dark" onClick={onHide}>
          Close
        </Button>
        <Button
          id="btn-save-recognition"
          variant="dark"
          onClick={onSaveRecognitionsClick}
          disabled={!description}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SaveRecognitionModal;
