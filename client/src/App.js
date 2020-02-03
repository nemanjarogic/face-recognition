import React, { Suspense } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import Layout from "./hoc/Layout/Layout";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
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
      <ProtectedRoute path="/logout" component={Logout} />
      <ProtectedRoute path="/profile" component={Profile} />
      <ProtectedRoute path="/home/:shortUrlCode" exact component={Home} />
      <ProtectedRoute path="/" exact component={Home} />
      <Route component={NotFound} />
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
