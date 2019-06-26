import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const grupo = {
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


export class GoogleMaps extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    grupos: [grupo]
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


             {this.state.grupos.map((value) => {

                <Marker 
                    onClick={this.onMarkerClick}
                    name={value.nome}
                    position={{ lat: value.endereco.latitude, lng: value.endereco.latitude }}
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
  