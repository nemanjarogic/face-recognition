import React, { Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

import Layout from "./hoc/Layout/Layout";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Logout from "./components/Logout/Logout";

import "./App.css";

const Home = React.lazy(() => {
  return import("./pages/Home/Home");
});

const Profile = React.lazy(() => {
  return import("./pages/Profile/Profile");
});

const App = props => {
  let routes = (
    <Switch>
      <Route path="/login" render={props => <Login {...props} />} />
      <Route path="/signup" render={props => <SignUp {...props} />} />
      <Route path="/profile" component={Profile} />
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
