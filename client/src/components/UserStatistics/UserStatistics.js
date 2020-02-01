import React from "react";
import { useSelector } from "react-redux";
import Badge from "react-bootstrap/Badge";

import "./UserStatistics.css";

const UserStatistics = () => {
  const submittedPhotos = useSelector(state => state.user.submittedPhotos);
  const recognizedFaces = useSelector(state => state.user.recognizedFaces);

  return (
    <div className="mb-5 mt-3">
      <div className="row">
        <p className="info text-white">Submitted photos:</p>
        <div>
          <Badge
            variant="transparent"
            className="border border-light text-white"
          >
            {submittedPhotos}
          </Badge>
        </div>
      </div>
      <div className="row">
        <p className="info text-white">Recognized faces:</p>
        <div>
          <Badge
            variant="transparent"
            className="border border-light text-white"
          >
            {recognizedFaces}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default UserStatistics;
