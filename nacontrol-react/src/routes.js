import React from "react";
import { isAuthenticated } from "./auth";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import CadastroGrupo from "./components/CadastroGrupo";
import GoogleMaps from "./components/Maps/GoogleMaps";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => isAuthenticated() ? (<Component {...props} />) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
    <Switch>
      <Route exact path="/" component={() => <h1>Hello World</h1>} />
      <PrivateRoute path="/app" component={() => <h1>Você está logado</h1>} />
      <Route path='/cadastro' component={CadastroGrupo}/>
      <Route path='/map' component={GoogleMaps}/>
    </Switch>
);

export default Routes;