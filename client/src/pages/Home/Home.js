import React from "react";
import Logo from "../../components/Logo/Logo";
import ImageLinkForm from "../../components/ImageLinkForm/ImageLinkForm";
import Rank from "../../components/Rank/Rank";
import FaceRecognition from "../../components/FaceRecognition/FaceRecognition";

const initialState = {
  input: "",
  imageUrl: "",
  faceRecognitionBoxes: [],
  route: "signin",
  isUserSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    submittedPhotos: 0,
    registredTime: ""
  }
};

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  onImageLinkChange = event => {
    this.setState({ input: event.target.value });
  };

  onImageDetectSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    fetch("http://localhost:3001/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch("http://localhost:3001/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(updatedSubmittedPhotos => {
              this.setState(
                Object.assign(this.state.user, {
                  submittedPhotos: updatedSubmittedPhotos
                })
              );
            })
            .catch(console.log);
        }

        this.displayFaceRecognitionBoxes(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  };

  calculateFaceLocation = data => {
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

  displayFaceRecognitionBoxes = faceRecognitionBoxes => {
    this.setState({ faceRecognitionBoxes: faceRecognitionBoxes });
  };

  onRouteChange = route => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isUserSignedIn: true });
    }

    this.setState({ route: route });
  };

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        submittedPhotos: data.submittedPhotos,
        registredTime: data.registredTime
      }
    });
  };

  render() {
    const { imageUrl, faceRecognitionBoxes } = this.state;

    const homeContent = (
      <div>
        <Logo />
        <Rank
          name={this.state.user.name}
          submittedPhotos={this.state.user.submittedPhotos}
        />
        <ImageLinkForm
          onImageLinkChange={this.onImageLinkChange}
          onImageDetectSubmit={this.onImageDetectSubmit}
        />
        <FaceRecognition
          imageUrl={imageUrl}
          faceRecognitionBoxes={faceRecognitionBoxes}
        />
      </div>
    );

    return <div>{homeContent}</div>;
  }
}

export default App;
