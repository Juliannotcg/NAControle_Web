import React, { Component } from 'react';


import Routes from './routes';
import GoogleMaps from './components/Maps/GoogleMaps';

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
