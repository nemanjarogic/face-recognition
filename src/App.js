import React from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import { clarifaiApiKey, particlesConfiguration } from './config';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
  apiKey: clarifaiApiKey
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      faceRecognitionBoxes: [],
      route:'signin',
      isUserSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        submitedPhotos: 0,
        registredTime: ''
      }
    }
  }

  onImageLinkChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onImageDetectSubmit = () => {
    this.setState({imageUrl: this.state.input});

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
     .then(response => {
       if(response) {
         fetch('http://localhost:3001/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              id: this.state.user.id
          })
      })
          .then(response => response.json())
          .then(updatedSubmitedPhotos => {
              this.setState(Object.assign(this.state.user, { submitedPhotos: updatedSubmitedPhotos }));
          })
       }
       this.displayFaceRecognitionBoxes(this.calculateFaceLocation(response))
     })
     .catch(err => console.log(err)); 
  }

  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return data.outputs[0].data.regions.map(region => {
      const clarifaiFace = region.region_info.bounding_box;

      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    });
  }

  displayFaceRecognitionBoxes = (faceRecognitionBoxes) => {
    this.setState({faceRecognitionBoxes: faceRecognitionBoxes})
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isUserSignedIn: false});
    } else if(route === 'home') {
      this.setState({isUserSignedIn: true});
    }

    this.setState({route: route});
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      submitedPhotos: data.submitedPhotos,
      registredTime: data.registredTime
    }})
  }

  render() {
    const { isUserSignedIn,  imageUrl, route, faceRecognitionBoxes } = this.state;

    const homeContent = 
      <div>
        <Logo />
        <Rank name={this.state.user.name} submitedPhotos={this.state.user.submitedPhotos}/>
        <ImageLinkForm 
          onImageLinkChange={this.onImageLinkChange} 
          onImageDetectSubmit={this.onImageDetectSubmit}/>
        <FaceRecognition imageUrl={imageUrl} faceRecognitionBoxes={faceRecognitionBoxes}/>
      </div>;

    const signInContent = 
      <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>;

    const registerContent = 
      <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>;

    return (
      <div className="App">
        <Particles className='particles' params={particlesConfiguration}/>
        <Navigation onRouteChange={this.onRouteChange} isUserSignedIn={isUserSignedIn}/>
        
        {
          route === 'home' ? homeContent : 
            ( route === 'signin' || route === 'signout' ? signInContent : registerContent)
        }
      </div>
    );
  }
}

export default App;
