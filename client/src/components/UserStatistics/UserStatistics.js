import React from "react";
import Badge from "react-bootstrap/Badge";

import "./UserStatistics.css";

const UserStatistics = ({ submittedPhotos }) => {
  return (
    <div className="mb-5 mt-3">
      <div className="row">
        <p className="info text-white">Submitted photos:</p>
        <div>
          <Badge
            variant="transparent"
            className="border border-light text-white"
          >
            {`${submittedPhotos}`}
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
            {`${submittedPhotos}`}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default UserStatistics;
