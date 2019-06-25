import React, { Component } from 'react';


import Routes from './routes';
import GoogleMaps from './components/Maps/GoogleMaps';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes />
        <GoogleMaps/>
      </div>


    );
  }
}

export default App;
