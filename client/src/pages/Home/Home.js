import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";

import { apiAxios } from "../../helpers";
import Logo from "../../components/Logo/Logo";
import ImageLinkForm from "./ImageLinkForm/ImageLinkForm";
import Rank from "./Rank/Rank";
import FaceRecognition from "./FaceRecognition/FaceRecognition";

import logoUrl from "./images/logo.png";

const Home = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [submittedImageUrl, setSubmittedImageUrl] = useState("");
  const [faceRecognitionBoxes, setFaceRecognitionBoxes] = useState([]);

  const user = useSelector(state => state.authentication.user);

  const onImageLinkChange = event => {
    setInputUrl(event.target.value);
  };

  const onImageDetectSubmit = () => {
    setSubmittedImageUrl(inputUrl);

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

  const calculateFaceLocation = data => {
    const image = document.getElementById("inputImage");
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
      <Rank name={user.name} submittedPhotos={user.submittedPhotos} />
      <ImageLinkForm
        onImageLinkChange={onImageLinkChange}
        onImageDetectSubmit={onImageDetectSubmit}
      />
      <FaceRecognition
        imageUrl={submittedImageUrl}
        faceRecognitionBoxes={faceRecognitionBoxes}
      />
    </Fragment>
  );
};

export default Home;
