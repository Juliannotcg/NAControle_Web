import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


class App extends Component {
  render() {
    return (
      <div className="App">

        <Map google={this.props.google} zoom={14}>

          <Marker onClick={this.onMarkerClick}
            name={'Current location'} />

          <InfoWindow onClose={this.onInfoWindowClose}>

          </InfoWindow>
        </Map>
      </div>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("")
})(App)
