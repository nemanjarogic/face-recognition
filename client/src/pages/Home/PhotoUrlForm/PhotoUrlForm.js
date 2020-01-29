import React, { Fragment } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./PhotoUrlForm.css";

const PhotoUrlForm = ({ onImageLinkChange, onImageDetectSubmit }) => {
  return (
    <Fragment>
      <p className="introduction">
        I will detect faces in your photos. Just give me a try!
      </p>
      <div className="center">
        <div className="form center">
          <Form.Control
            type="text"
            placeholder="Photo URL"
            onChange={onImageLinkChange}
          />
          <Button variant="dark" onClick={onImageDetectSubmit}>
            Detect
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default PhotoUrlForm;
