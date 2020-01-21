import React, { Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Particles from "react-particles-js";

import { particlesConfiguration } from "./config/particlesConfig";
import Header from "./components/Header/Header";
import Login from "./components/Authentication/Login/Login";
import SignUp from "./components/Authentication/SignUp/SignUp";

import "./App.css";

const Home = React.lazy(() => {
  return import("./containers/Home/Home");
});

const App = () => {
  const isUserAuthenticated = false;

  let routes = (
    <Switch>
      <Route path="/login" render={props => <Login {...props} />} />
      <Route path="/signup" render={props => <SignUp {...props} />} />
      <Redirect to="/login" />
    </Switch>
  );

  if (isUserAuthenticated) {
    routes = (
      <Switch>
        <Route path="/profile" render={() => <h1>User profile</h1>} />
        <Route path="/logout" component={() => <h1>Logout</h1>} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div className="App">
      <Particles className="particles" params={particlesConfiguration} />
      <Header />
      <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
    </div>
  );
};

export default withRouter(App);
