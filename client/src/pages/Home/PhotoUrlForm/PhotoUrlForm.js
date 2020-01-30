import React, { Fragment } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./PhotoUrlForm.css";

const PhotoUrlForm = ({ onPhotoUrlChange, onDetectFacesSubmit }) => {
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
            onChange={onPhotoUrlChange}
          />
          <Button variant="dark" onClick={onDetectFacesSubmit}>
            Detect
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default PhotoUrlForm;
