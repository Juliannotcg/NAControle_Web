import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom';

const links = [
    { route: "/", label: "Home"},
    { route: "/cadastro", label: "Cadastrogrupo"},
    { route: "/map", label: "GoogleMaps"},
];

export class NavBar extends Component{
    renderLink = () => {
        return links.map( link =>
            <Link key={link.route} className="nav-link" to={link.route}>
                {link.label}
            </Link>
        )
    }

    render(){
        return(
        <div>
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        { this.renderLink() }
                    </ul>
                </div>
            </nav>
        </div>
        )
    }
}
export default NavBar;