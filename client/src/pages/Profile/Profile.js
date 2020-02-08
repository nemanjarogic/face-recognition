import React, { Fragment } from "react";

import Logo from "../../components/Logo/Logo";
import UserStatistics from "../../components/UserStatistics/UserStatistics";
import SavedRecognitions from "./SavedRecognitions/SavedRecognitions";

import logoUrl from "../../assets/images/user.png";

const Profile = props => {
  return (
    <Fragment>
      <Logo logoUrl={logoUrl} description="Face Recognition Logo" />
      <UserStatistics />
      <SavedRecognitions {...props} />
    </Fragment>
  );
};

export default Profile;
