import React, { Component } from 'react';


import Routes from './routes';
import {BrowserRouter as Router } from 'react-router-dom';
import GoogleMaps from './components/Maps/GoogleMaps';
import NavBar from './components/NavBar';
import CadastroGrupo from './components/CadastroGrupo';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Routes />
        </div>
      </Router>
    );
  }
}

export default App;
