import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Logo from "../../components/Logo/Logo";
import UserStatistics from "../../components/UserStatistics/UserStatistics";
import SavedRecognitions from "./SavedRecognitions/SavedRecognitions";
import { userActions } from "../../store/actions";

import logoUrl from "../../assets/images/user.png";

const Profile = () => {
  const userId = useSelector(state => state.authentication.user.id);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = { id: userId };
    dispatch(userActions.fetchRecognitionStatistics(user));
  }, [dispatch, userId]);

  return (
    <Fragment>
      <Logo logoUrl={logoUrl} description="Face Recognition Logo" />
      <UserStatistics />
      <SavedRecognitions />
    </Fragment>
  );
};

export default Profile;
