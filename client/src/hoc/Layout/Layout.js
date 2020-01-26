import React, { Fragment } from "react";
import Particles from "react-particles-js";

import { particlesConfiguration } from "../../config";
import Header from "./Header/Header";
import Alert from "./Alert/Alert";

import "./Layout.css";

const Layout = props => {
  return (
    <Fragment>
      <Particles className="particles" params={particlesConfiguration} />
      <Header />
      <Alert />
      <main style={{ margin: 15 }}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
