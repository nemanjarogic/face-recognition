import React, { Fragment } from "react";

import Logo from "../../components/Logo/Logo";
import UserStatistics from "../../components/UserStatistics/UserStatistics";
import SavedRecognitions from "./SavedRecognitions/SavedRecognitions";

import logoUrl from "../../assets/images/user.png";

const Profile = () => {
  return (
    <Fragment>
      <Logo logoUrl={logoUrl} description="Face Recognition Logo" />
      <UserStatistics />
      <SavedRecognitions />
    </Fragment>
  );
};

export default Profile;
