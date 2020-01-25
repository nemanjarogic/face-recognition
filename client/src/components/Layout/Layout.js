import React, { Fragment } from "react";
import Particles from "react-particles-js";

import { particlesConfiguration } from "../../config";
import Header from "./Header/Header";
import Alert from "./Alert/Alert";

import "./Layout.css";

const Layout = () => {
  return (
    <Fragment>
      <Particles className="particles" params={particlesConfiguration} />
      <Header />
      <Alert />
    </Fragment>
  );
};

export default Layout;
