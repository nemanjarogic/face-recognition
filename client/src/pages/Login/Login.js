import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Spinner from "react-bootstrap/Spinner";

import { authenticationActions } from "../../store/actions";
import TransparentBox from "../../hoc/TransparentBox/TransparentBox";

import "./Login.css";

const Login = props => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const isLoggingInProgress = useSelector(
    state => state.authentication.isLoggingInProgress
  );
  const login = (email, password) =>
    dispatch(authenticationActions.login(email, password));

  const onLoginSubmit = data => {
    //react-hook-form will call this function after successfull validation
    const { email, password } = data;
    login(email, password);
  };

  const switchToSignUpPage = () => {
    props.history.push("/signup");
  };

  return (
    <TransparentBox>
      <legend className="f1 fw6 ph0 mh0">Log In</legend>
      <Form onSubmit={handleSubmit(onLoginSubmit)}>
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
            ref={register({ required: true })}
          />
          {errors.password && (
            <p className="validation">Please enter your password</p>
          )}
        </Form.Group>
        <Button variant="outline-dark" type="submit">
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
