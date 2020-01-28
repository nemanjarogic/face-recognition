import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onImageLinkChange, onImageDetectSubmit }) => {
  return (
    <div>
      <p className="f3">
        {"I will try to detect faces in your pictures. Just give me a try. "}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f5 pa2 w-70 center"
            type="text"
            onChange={onImageLinkChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-black"
            onClick={onImageDetectSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
