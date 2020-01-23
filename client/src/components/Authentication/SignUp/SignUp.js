import React from "react";
import { connect } from "react-redux";
import { authenticationActions } from "../../../store/actions";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }

  onNameChange = event => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  onRegisterSubmit = () => {
    const { name, email, password } = this.state;
    if (name && email && password) {
      this.props.signUp({ name, email, password });
    }
  };

  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign Up</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  onChange={this.onNameChange}
                  type="string"
                  name="name"
                  id="name"
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  type="email"
                  name="email-address"
                  id="email-address"
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.onPasswordChange}
                  type="password"
                  name="password"
                  id="password"
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                />
              </div>
            </fieldset>
            <div>
              <input
                onClick={this.onRegisterSubmit}
                type="submit"
                value="Sign Up"
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignUpInProgress: state.authentication.isSignUpInProgress
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: user => dispatch(authenticationActions.signUp(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
