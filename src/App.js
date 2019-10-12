import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';

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

function App() {
  return (
    <div className="App">
      <Particles className='particles' params={particlesConfiguration}/>
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
    </div>
  );
}

export default App;
