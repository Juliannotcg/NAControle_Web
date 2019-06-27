import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import API from '../../API/API';

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


  componentDidMount = () => {
    this.buscar();
  }

  buscar() {
    
    fetch("https://localhost:44399/api/Grupo/grupos")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          grupos: result
        });
      },
      (error) => {
        this.setState({
          error
        });
      }
    )

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
    const { grupos } = this.state;
    return (
      <Map google={this.props.google} zoom={14}>

        {
          grupos.map(marker =>
            <Marker
              onClick={this.onMarkerClick}
              key={marker.rua}
              title={marker.nome}
              position={{ lat: marker.enderecoViewModel.latitude, lng: marker.enderecoViewModel.longitude }}
            />
          )
        }

        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}>
          <div>
            <h1>{this.state.selectedPlace.nome}</h1>
          </div>
        </InfoWindow>

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDryBws_KN0rstpvoaihKGxLBGgxEnQtTY")
})(GoogleMaps)
