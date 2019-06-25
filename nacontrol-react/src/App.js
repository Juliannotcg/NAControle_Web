import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        infraestruturas: [],
        mainLoading: false,
        mensagemErro: null,
        filtro: {},
        instalacoes: []
    }

    this.buscar = this.buscar.bind(this);
    this.mostrarMensagemErro = this.mostrarMensagemErro.bind(this);
    this.buscarInstalacoes = this.buscarInstalacoes.bind(this);
}
  

  buscar() {
    this.setState({ mainLoading: true });

    API.Infraestrutura.post("/infraestrutura/busca", this.state.filtro)
    .then(infraestruturas => {
        this.setState({ infraestruturas: infraestruturas, mainLoading: false })
    }, (evt) => this.mostrarMensagemErro({ mainLoading: false }, evt));
}
  
  
  
  
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
