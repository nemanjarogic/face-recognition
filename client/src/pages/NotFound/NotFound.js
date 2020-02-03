import React from "react";
import Button from "react-bootstrap/Button";

import "./NotFound.css";

const NotFound = props => {
  const onHomeClick = () => {
    props.history.push("/");
  };

  return (
    <div>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <p>Page not found</p>
      <Button variant="dark" onClick={onHomeClick}>
        Home
      </Button>
    </div>
  );
};

export default NotFound;
