import React, { Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

import Layout from "./hoc/Layout/Layout";
import Login from "./components/Authentication/Login/Login";
import Logout from "./components/Authentication/Logout/Logout";
import SignUp from "./components/Authentication/SignUp/SignUp";

import "./App.css";

const Home = React.lazy(() => {
  return import("./pages/Home/Home");
});

const App = props => {
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
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

export default withRouter(App);
