import React from "react";
import Tilt from "react-tilt";

import "./Logo.css";

const Logo = props => {
  return (
    <div className="center">
      <Tilt className="Tilt" options={{ max: 50 }}>
        <div className="Tilt-inner">
          <img alt={props.description} src={props.logoUrl} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
