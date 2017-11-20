import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import {Link} from 'react-router';

class App extends Component {

    constructor() {
        super();
    }
    
    render() {
        return (
            <div id="layout">
                <Link to="/home" id="menuLink" className="menu-link">
                    <span></span>
                </Link>
                <div id="menu">
                <div className="pure-menu">
                    <a className="pure-menu-heading" href="#">Company</a>
                    <ul className="pure-menu-list">
                        <li className="pure-menu-item"><Link to="/" className="pure-menu-link">Home</Link></li>
                        <li className="pure-menu-item"><Link to="/autor" className="pure-menu-link">Autor</Link></li> 
                        <li className="pure-menu-item"><Link to="/livro" className="pure-menu-link">Livro</Link></li> 
                    </ul>
                </div>
                </div>
                <div id="main">
                    {this.props.children} 
                </div>
            </div>
        );
    }
}

export default App;