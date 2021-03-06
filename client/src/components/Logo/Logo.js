import React from "react";
import Tilt from "react-tilt";

import "./Logo.css";

const Logo = ({ logoUrl, description }) => {
  return (
    <div className="center">
      <Tilt className="Tilt" options={{ max: 50 }}>
        <div className="Tilt-inner">
          <img src={logoUrl} alt={description} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
