import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


export class GoogleMaps extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    dadosGrupo: {
      nome: null,
      endereco: {
        logradouro: null,
        lote: null,
        rua: null,
        quadra: null,
        cep: null,
        cidade: null,
        uf: null,
        latitude: null,
        longitude: null,
      }
    }
  };

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

    render(){
        return(
            <Map google={this.props.google} zoom={14}>

            <Marker 
              onClick={this.onMarkerClick}
              name={'Endereço do grupo'}
              position={{ lat: 37.779519, lng: -122.40564 }}
              title="The marker`s title will appear as a tooltip." />

            <Marker
              onClick={this.onMarkerClick}
              name="SOMA"
              position={{ lat: 37.778519, lng: -122.40564 }}
              title="The marker`s title will appear as a tooltip." />

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
  