import React, { Fragment } from "react";
import Particles from "react-particles-js";

import { particlesConfiguration } from "../../config";
import Header from "../../components/Header/Header";
import Alert from "../../components/Alert/Alert";

import "./Layout.css";

const Layout = props => {
  return (
    <Fragment>
      <Particles className="particles" params={particlesConfiguration} />
      <Header />
      <main style={{ margin: 15 }}>{props.children}</main>
      <Alert />
    </Fragment>
  );
};

export default Layout;
