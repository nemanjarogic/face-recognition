import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

import "./UserStatistics.css";

const UserStatistics = ({ submittedPhotos }) => {
  return (
    <Container className="mb-5 mt-2">
      <Row className="row justify-content-center">
        <Col>
          <p className="info text-white d-inline">{`Submitted photos: `}</p>
        </Col>
        <Col>
          <Badge
            variant="transparent"
            className="d-inline border border-light text-white"
          >
            {`${submittedPhotos}`}
          </Badge>
        </Col>
      </Row>
      <Row className="mt-2 row justify-content-center">
        <Col className="col justify-self-end">
          <p className="info text-white d-inline">{`Recognized faces: `}</p>
        </Col>
        <Col>
          <Badge
            variant="transparent"
            className="d-inline border border-light text-white"
          >
            {`${submittedPhotos}`}
          </Badge>
        </Col>
      </Row>
    </Container>
  );
};

export default UserStatistics;
