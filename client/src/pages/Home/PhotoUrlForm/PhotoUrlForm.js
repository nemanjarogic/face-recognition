import React, { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./PhotoUrlForm.css";

const PhotoUrlForm = ({ onDetectFacesSubmit }) => {
  const [inputUrl, setInputUrl] = useState("");
  const [submittedInputUrl, setSubmittedInputUrl] = useState("");

  const onPhotoUrlChange = event => {
    setInputUrl(event.target.value);
  };

  const onPhotoDetection = () => {
    if (inputUrl === submittedInputUrl) {
      return;
    }

    setSubmittedInputUrl(inputUrl);
    onDetectFacesSubmit(inputUrl);
  };

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
          <Button
            id="btn-detect"
            variant="dark"
            onClick={onPhotoDetection}
            disabled={inputUrl === submittedInputUrl}
          >
            Detect
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default PhotoUrlForm;
