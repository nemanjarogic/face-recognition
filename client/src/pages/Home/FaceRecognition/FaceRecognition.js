import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import "./FaceRecognition.css";

const FaceRecognition = ({
  imageUrl,
  faceRecognitionBoxes,
  onSaveRecognitionRequest
}) => {
  const saveRecognitionDivRef = useRef(null);

  if (!imageUrl) {
    return null;
  }

  return (
    <div className="recognition-outer-containter center">
      <div className="absolute">
        <div id="recognition-image-containter">
          <Image
            id="recognition-image"
            src={imageUrl}
            alt="Face Recognition Image"
            rounded
          />
        </div>

        {faceRecognitionBoxes.map((box, index) => {
          return (
            <div
              key={index}
              className="recognition-draw-box"
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom:
                  box.bottomRow + saveRecognitionDivRef.current.clientHeight,
                left: box.leftCol
              }}
            ></div>
          );
        })}
        <div ref={saveRecognitionDivRef}>
          <Button
            id="btn-save-recognition"
            variant="dark"
            onClick={onSaveRecognitionRequest}
          >
            Save Recognition
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FaceRecognition;
