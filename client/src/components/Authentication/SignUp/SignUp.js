import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Spinner from "react-bootstrap/Spinner";

import { authenticationActions } from "../../../store/actions";
import TransparentBox from "../../../hoc/TransparentBox/TransparentBox";

import "./SignUp.css";

const SignUp = props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isSignUpInProgress = useSelector(
    state => state.authentication.isSignUpInProgress
  );

  const dispatch = useDispatch();
  const signUp = user => dispatch(authenticationActions.signUp(user));

  const onNameChange = event => {
    setName(event.target.value);
  };

  const onEmailChange = event => {
    setEmail(event.target.value);
  };

  const onPasswordChange = event => {
    setPassword(event.target.value);
  };

  const onSignInSubmit = event => {
    event.preventDefault();
    if (name && email && password) {
      signUp({ name, email, password });
    }
  };

  const switchToLogInPage = () => {
    props.history.push("/login");
  };

  return (
    <TransparentBox>
      <div>
        <legend className="f1 fw6 ph0 mh0 d-inline">Sign Up</legend>
      </div>
      <Form>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            className="bg-transparent border-dark"
            type="text"
            onChange={onNameChange}
          />
        </Form.Group>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email</Form.Label>
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
        <Button variant="outline-dark" type="submit" onClick={onSignInSubmit}>
          Submit
        </Button>
        {isSignUpInProgress && <Spinner animation="border" size="sm" />}
      </Form>
      <div className="mt-3">
        <p className="d-inline">Already have an account? </p>
        <Nav.Link className="log-in d-inline" onClick={switchToLogInPage}>
          Log In
        </Nav.Link>
      </div>
    </TransparentBox>
  );
};

export default SignUp;
