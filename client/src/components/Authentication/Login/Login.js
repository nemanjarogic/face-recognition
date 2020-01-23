import React from "react";
import { connect } from "react-redux";
import { authenticationActions } from "../../../store/actions";

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

  onLoginSubmit = () => {
    const { loginEmail, loginPassword } = this.state;
    if (loginEmail && loginPassword) {
      this.props.login(loginEmail, loginPassword);
    }
  };

  render() {
    //const { onRouteChange } = this.props;

    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-30-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Log In</legend>
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
                type="submit"
                value="Log In"
                onClick={this.onLoginSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib center"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => this.props.history.push("/signup")}
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
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
      dispatch(authenticationActions.login(email, password)),
    logout: () => dispatch(authenticationActions.logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
