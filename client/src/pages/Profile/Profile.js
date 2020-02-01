import React, { Fragment } from "react";

import Logo from "../../components/Logo/Logo";
import UserStatistics from "../../components/UserStatistics/UserStatistics";

import logoUrl from "../../assets/images/user.png";

const Profile = () => {
  return (
    <Fragment>
      <Logo logoUrl={logoUrl} description="Face Recognition Logo" />
      <UserStatistics />
    </Fragment>
  );
};

export default Profile;
