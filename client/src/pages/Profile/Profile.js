import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import Logo from "../../components/Logo/Logo";
import UserStatistics from "../../components/UserStatistics/UserStatistics";

import logoUrl from "../../assets/images/user.png";

const Profile = () => {
  const user = useSelector(state => state.authentication.user);

  return (
    <Fragment>
      <Logo logoUrl={logoUrl} description="Face Recognition Logo" />
      <UserStatistics name={user.name} submittedPhotos={user.submittedPhotos} />
    </Fragment>
  );
};

export default Profile;
