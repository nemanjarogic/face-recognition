import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Spinner from "react-bootstrap/Spinner";

import { authenticationActions } from "../../../store/actions";
import TransparentBox from "../../../hoc/TransparentBox/TransparentBox";

import "./SignUp.css";

const SignUp = props => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const isSignUpInProgress = useSelector(
    state => state.authentication.isSignUpInProgress
  );
  const signUp = user => dispatch(authenticationActions.signUp(user));

  const onSignInSubmit = data => {
    const { name, email, password } = data;
    signUp({ name, email, password });
  };

  const switchToLogInPage = () => {
    props.history.push("/login");
  };

  return (
    <TransparentBox>
      <legend className="f1 fw6 ph0 mh0 d-inline">Sign Up</legend>
      <Form onSubmit={handleSubmit(onSignInSubmit)}>
        <Form.Group controlId="formGroupName">
          <Form.Label className="font-weight-bold">Name</Form.Label>
          <Form.Control
            name="name"
            className="bg-transparent border-dark"
            type="text"
            ref={register({ required: true })}
          />
          {errors.name && <p className="validation">Please enter your name</p>}
        </Form.Group>
        <Form.Group controlId="formGroupEmail">
          <Form.Label className="font-weight-bold">Email address</Form.Label>
          <Form.Control
            name="email"
            className="bg-transparent border-dark"
            type="email"
            ref={register({ required: true })}
          />
          {errors.email && (
            <p className="validation">Please enter your email address</p>
          )}
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label className="font-weight-bold">Password</Form.Label>
          <Form.Control
            name="password"
            className="bg-transparent border-dark"
            type="password"
            ref={register({ required: true, minLength: 6 })}
          />
          {errors.password && (
            <p className="validation">
              Please enter your password (min 6 characters)
            </p>
          )}
        </Form.Group>
        <Button variant="outline-dark" type="submit">
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
