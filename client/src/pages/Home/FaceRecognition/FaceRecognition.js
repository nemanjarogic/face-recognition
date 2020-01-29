import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, faceRecognitionBoxes }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          alt="I am still waiting on you..."
          width="500"
          height="auto"
          src={imageUrl}
        />
        {/* put some fancy image border */}
        {faceRecognitionBoxes.map((box, index) => (
          <div
            key={index}
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;
