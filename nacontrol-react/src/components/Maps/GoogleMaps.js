import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


const grupo = {
  id: 1,
  name: "Teste"
};

export class GoogleMaps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
      grupos: []
    };

   // this.buscar = this.buscar.bind(this);
}

<<<<<<< HEAD
componentDidMount = () => {
  this.setState({
    grupos: [{
      id: 1,
      name: "Teste",
      latitude: 37.774929,
      longitude: -122.419416
    },
    {
      id: 2,
      name: "23",
      latitude: -15.7941,
      longitude: -47.8825
    }]
  });
} 


  // buscar() {
  //   API.grupo.get("/grupos")
  //     .then(gruposRetorno => {
  //       this.setState({ grupos: gruposRetorno })
  //     });
  // }
=======
  buscar() {
    API.grupo.get("grupos")
      .then(gruposRetorno => {
        this.setState({ grupos: gruposRetorno })
      });
  }
>>>>>>> 3508cac75032eefa9829417ecb8cf885ac749c81

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
              key={marker.id} 
              title={marker.name}
              position={{ lat: marker.latitude, lng: marker.longitude }}
            />
            )
          }

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
