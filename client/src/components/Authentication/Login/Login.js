import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Spinner from "react-bootstrap/Spinner";

import { authenticationActions } from "../../../store/actions";
import TransparentBox from "../../../hoc/TransparentBox/TransparentBox";

import "./Login.css";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLoggingInProgress = useSelector(
    state => state.authentication.isLoggingInProgress
  );

  const dispatch = useDispatch();
  const login = (email, password) =>
    dispatch(authenticationActions.login(email, password));

  const onEmailChange = event => {
    setEmail(event.target.value);
  };

  const onPasswordChange = event => {
    setPassword(event.target.value);
  };

  const onLoginSubmit = event => {
    event.preventDefault();
    if (email && password) {
      login(email, password);
    }
  };

  const switchToSignUpPage = () => {
    props.history.push("/signup");
  };

  return (
    <TransparentBox>
      <legend className="f1 fw6 ph0 mh0">Log In</legend>
      <Form>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            className="bg-transparent border-dark"
            type="email"
            onChange={onEmailChange}
          />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="bg-transparent border-dark"
            type="password"
            onChange={onPasswordChange}
          />
        </Form.Group>
        <Button variant="outline-dark" type="submit" onClick={onLoginSubmit}>
          Submit
        </Button>
        {isLoggingInProgress && <Spinner animation="border" size="sm" />}
      </Form>
      <div className="mt-3">
        <p className="d-inline">Don't have an account yet? </p>
        <Nav.Link className="sign-up d-inline" onClick={switchToSignUpPage}>
          Sign up
        </Nav.Link>
      </div>
    </TransparentBox>
  );
};

export default Login;
