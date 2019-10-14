import React from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
  apiKey: '681195e7b95b49638874121ead95f132'
 });

const particlesConfiguration = {
  "particles": {
      "number": {
          "value": 100
      },
      "size": {
          "value": 2
      }
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "repulse"
          }
      }
  }
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route:'signin'
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
     .then(response => this.displayFaceRecognitionBoxes(this.calculateFaceLocation(response)))
     .catch(err => console.log(err)); 
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceRecognitionBoxes = (box) => {
    console.log(box);
    this.setState({box: box})
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  render() {
    const homeContent = 
      <div>
        <Navigation onRouteChange={this.onRouteChange}/>
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
    </div>;

    const signInContent = 
      <SignIn onRouteChange={this.onRouteChange}/>;

    const registerContent = 
      <Register onRouteChange={this.onRouteChange}/>;

    return (
      <div className="App">
        <Particles className='particles' params={particlesConfiguration}/>
        
        {
          this.state.route === 'home' ? homeContent : 
            ( this.state.route === 'signin' ? signInContent : registerContent)
        }
      </div>
    );
  }
}

export default App;
