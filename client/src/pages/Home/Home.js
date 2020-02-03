import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiAxios } from "../../helpers";
import Logo from "../../components/Logo/Logo";
import UserStatistics from "../../components/UserStatistics/UserStatistics";
import PhotoUrlForm from "./PhotoUrlForm/PhotoUrlForm";
import FaceRecognition from "./FaceRecognition/FaceRecognition";
import SaveRecognitionModal from "./SaveRecognitionModal/SaveRecognitionModal";
import { userActions, alertActions } from "../../store/actions";
import { savedRecognitionsService } from "../../services";

import logoUrl from "../../assets/images/logo.png";

const Home = props => {
  const [submittedPhotoUrl, setSubmittedPhotoUrl] = useState("");
  const [faceRecognitionBoxes, setFaceRecognitionBoxes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const userId = useSelector(state => state.authentication.user.id);
  const dispatch = useDispatch();

  const onDetectFacesSubmit = useCallback(
    inputUrl => {
      setSubmittedPhotoUrl(inputUrl);

      apiAxios
        .post("/recognize", { input: inputUrl })
        .then(response => {
          if (!response.data) {
            return;
          }

          setFaceRecognitionBoxes(calculateFaceLocation(response.data));

          const user = {
            id: userId,
            recognizedFaces: response.data.outputs[0].data.regions.length
          };
          dispatch(userActions.updateRecognitionStatistics(user));
        })
        .catch(err => console.log(err));
    },
    [dispatch, userId]
  );

  useEffect(() => {
    if (!props.match.params.shortUrlCode) {
      return;
    }

    savedRecognitionsService
      .getOriginalPhotoUrl(props.match.params.shortUrlCode, userId)
      .then(response => {
        onDetectFacesSubmit(response);
      });
  }, [props.match.params.shortUrlCode, userId, onDetectFacesSubmit]);

  const onSaveRecognitionsSubmit = description => {
    const user = { id: userId };

    savedRecognitionsService
      .saveRecognition(user, description, submittedPhotoUrl)
      .then(response => {
        dispatch(alertActions.showSuccessNotification(response));
      })
      .catch(err => {
        dispatch(
          alertActions.showErrorNotification(
            "An error occurred while saving recognition. Please try again later."
          )
        );
      });
  };

  const calculateFaceLocation = data => {
    const image = document.getElementById("recognition-image");
    const width = Number(image.width);
    const height = Number(image.height);

    return data.outputs[0].data.regions.map(region => {
      const clarifaiFace = region.region_info.bounding_box;

      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height
      };
    });
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
