import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import API from './API/API';

export class GoogleMaps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
      grupos: []
    };

    this.buscar = this.buscar.bind(this);
}

  buscar() {
    API.grupo.get("grupos")
      .then(gruposRetorno => {
        this.setState({ grupos: gruposRetorno })
      });
  }

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true,
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };

  render() {
    return (
      <Map google={this.props.google} zoom={14}>

        {this.state.grupos.forEach(element => {
          <Marker
          onClick={this.onMarkerClick}
          name={element.nome}
          position={{ lat: element.endereco.latitude, lng: element.endereco.latitude }}
          title="The marker`s title will appear as a tooltip." />

        })}

        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDryBws_KN0rstpvoaihKGxLBGgxEnQtTY")
})(GoogleMaps)
