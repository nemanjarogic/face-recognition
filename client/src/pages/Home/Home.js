import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { savedRecognitionsService, userService } from "../../services";
import {
  userActions,
  alertActions,
  authenticationActions
} from "../../store/actions";
import { getPlainLoggedInUser } from "../../helpers";
import Logo from "../../components/Logo/Logo";
import UserStatistics from "../../components/UserStatistics/UserStatistics";
import PhotoUrlForm from "./PhotoUrlForm/PhotoUrlForm";
import FaceRecognition from "./FaceRecognition/FaceRecognition";
import SaveRecognitionModal from "./SaveRecognitionModal/SaveRecognitionModal";

import logoUrl from "../../assets/images/logo.png";

const Home = props => {
  const [submittedPhotoUrl, setSubmittedPhotoUrl] = useState("");
  const [faceRecognitionBoxes, setFaceRecognitionBoxes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRecognitionInProgress, setIsRecognitionInProgress] = useState(false);

  const userId = useSelector(state => state.authentication.user.id);
  const dispatch = useDispatch();

  const handleError = useCallback(
    err => {
      const { status } = err.response;
      if (status === 401) {
        dispatch(authenticationActions.logout());
        props.history.push("/logout");
        window.location.reload(true);

        return;
      }

      setIsRecognitionInProgress(false);
      dispatch(
        alertActions.showErrorNotification(
          "An error occurred. Please try again later."
        )
      );
    },
    [dispatch, props.history]
  );

  const onDetectFacesSubmit = useCallback(
    inputUrl => {
      setIsRecognitionInProgress(true);
      setSubmittedPhotoUrl(inputUrl);

      userService
        .detectFaces(inputUrl, dispatch)
        .then(response => {
          if (!response || isEmptyObject(response.outputs[0].data)) {
            throw new Error(
              "Please choose another photo for face recognition."
            );
          }

          const regions = response.outputs[0].data.regions;
          const user = getPlainLoggedInUser();
          user.recognizedFaces = regions.length;

          setFaceRecognitionBoxes(calculateFaceLocation(regions));
          dispatch(userActions.updateRecognitionStatistics(user));
          setIsRecognitionInProgress(false);
        })
        .catch(handleError);
    },
    [dispatch, handleError]
  );

  useEffect(() => {
    const shortCode = props.match.params.shortCode;
    if (!shortCode) {
      return;
    }

    // Because detect can be requested for both, original and shorten photo URL, and we are on localhost -> find original photo URL.
    //Face recognition API can't work with localhost shorten URL photos
    savedRecognitionsService
      .getOriginalPhotoUrl(shortCode, userId)
      .then(originalPhotoUrl => {
        onDetectFacesSubmit(originalPhotoUrl);
      })
      .catch(handleError);
  }, [props.match.params.shortCode, userId, onDetectFacesSubmit, handleError]);

  const onSaveRecognitionsSubmit = description => {
    const user = getPlainLoggedInUser();

    savedRecognitionsService
      .saveRecognition(user, description, submittedPhotoUrl)
      .then(response => {
        dispatch(alertActions.showSuccessNotification(response));
      })
      .catch(handleError);
  };

  const calculateFaceLocation = regions => {
    const image = document.getElementById("recognition-image");
    const width = Number(image.width);
    const height = Number(image.height);

    return regions.map(region => {
      const clarifaiFace = region.region_info.bounding_box;

      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height
      };
    });
  };

  const isEmptyObject = obj => {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
  };

  return (
    <Fragment>
      <Logo logoUrl={logoUrl} description="Face Recognition Logo" />
      <UserStatistics />

      <PhotoUrlForm onDetectFacesSubmit={onDetectFacesSubmit} />
      <FaceRecognition
        imageUrl={submittedPhotoUrl}
        faceRecognitionBoxes={faceRecognitionBoxes}
        onSaveRecognitionRequest={() => setIsModalVisible(true)}
        isRecognitionInProgress={isRecognitionInProgress}
      />
      <SaveRecognitionModal
        show={isModalVisible}
        onHide={() => setIsModalVisible(false)}
        onSaveRecognitionsSubmit={onSaveRecognitionsSubmit}
      />
    </Fragment>
  );
};

export default Home;
