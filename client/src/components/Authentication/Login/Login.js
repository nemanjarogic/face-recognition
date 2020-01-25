import React from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

import { authenticationActions } from "../../../store/actions";

import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginEmail: "",
      loginPassword: ""
    };
  }

  onEmailChange = event => {
    this.setState({ loginEmail: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ loginPassword: event.target.value });
  };

  onLoginSubmit = event => {
    event.preventDefault();
    const { loginEmail, loginPassword } = this.state;
    if (loginEmail && loginPassword) {
      this.props.login(loginEmail, loginPassword);
    }
  };

  render() {
    return (
      <div>
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-30-l mw6 shadow-5 center">
          <main className="pa4 black-80">
            <legend className="f1 fw6 ph0 mh0">Log In</legend>
            <Form>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className="bg-transparent border-dark"
                  type="email"
                  onChange={this.onEmailChange}
                />
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="bg-transparent border-dark"
                  type="password"
                  onChange={this.onPasswordChange}
                />
              </Form.Group>
              <Button
                variant="outline-dark"
                type="submit"
                onClick={this.onLoginSubmit}
              >
                Submit
              </Button>
            </Form>
            <div className="mt-3">
              <p className="d-inline">Don't have an account yet? </p>
              <Nav.Link
                className="sign-up d-inline"
                onClick={() => this.props.history.push("/signup")}
              >
                Sign up
              </Nav.Link>
            </div>
          </main>
        </article>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggingInProgress: state.authentication.isLoggingInProgress
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) =>
      dispatch(authenticationActions.login(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
