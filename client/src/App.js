import React, { Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Particles from "react-particles-js";
import { connect } from "react-redux";

import { history } from "./helpers";

import { particlesConfiguration } from "./config";
import { alertActions } from "./store/actions";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import Header from "./components/Header/Header";
import Login from "./components/Authentication/Login/Login";
import Logout from "./components/Authentication/Logout/Logout";
import SignUp from "./components/Authentication/SignUp/SignUp";

import "./App.css";

const Home = React.lazy(() => {
  return import("./pages/Home/Home");
});

class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearNotifications();
    });
  }

  render() {
    const { alert } = this.props;

    let routes = (
      <Switch>
        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/signup" render={props => <SignUp {...props} />} />
        <ProtectedRoute path="/profile" render={() => <h1>User profile</h1>} />
        <Route path="/logout" component={Logout} />
        <ProtectedRoute path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );

    return (
      <div className="App">
        <Particles className="particles" params={particlesConfiguration} />
        <Header isUserSignedIn={true} />

        <div className="jumbotron">
          <div className="container">
            <div className="col-sm-8 col-sm-offset-2">
              {alert.message && (
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              )}
            </div>
          </div>
        </div>

        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </div>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearNotifications: alertActions.clearNotifications
};

export default withRouter(connect(mapState, actionCreators)(App));
