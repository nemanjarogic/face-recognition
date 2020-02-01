import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";

import { apiAxios } from "../../helpers";
import Logo from "../../components/Logo/Logo";
import UserStatistics from "../../components/UserStatistics/UserStatistics";
import PhotoUrlForm from "./PhotoUrlForm/PhotoUrlForm";
import FaceRecognition from "./FaceRecognition/FaceRecognition";
import SaveRecognitionModal from "./SaveRecognitionModal/SaveRecognitionModal";

import logoUrl from "./images/logo.png";

const Home = () => {
  const [submittedPhotoUrl, setSubmittedPhotoUrl] = useState("");
  const [faceRecognitionBoxes, setFaceRecognitionBoxes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const user = useSelector(state => state.authentication.user);

  const onDetectFacesSubmit = inputUrl => {
    setSubmittedPhotoUrl(inputUrl);

    apiAxios
      .post("/imageurl", { input: inputUrl })
      .then(response => {
        if (!response.data) {
          return;
        }

        apiAxios
          .put("/image", { id: user.id })
          .then(updateResponse => {
            //const updatedSubmittedPhotos = updateResponse.data;
            // this.setState(
            //   Object.assign(user, {
            //     submittedPhotos: updatedSubmittedPhotos
            //   })
            // );
          })
          .catch(console.log);

        setFaceRecognitionBoxes(calculateFaceLocation(response.data));
      })
      .catch(err => console.log(err));
  };

  const onSaveRecognitionsSubmit = description => {
    console.log(description);
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
      <UserStatistics name={user.name} submittedPhotos={user.submittedPhotos} />

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
