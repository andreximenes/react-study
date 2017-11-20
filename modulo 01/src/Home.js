import React, { Component } from 'react';

export default class Home extends Component {
    
    render() {
        return (
            <div>
                <div className="header">
                    <h1>Bem vindo ao Sistema</h1>
                </div>
                <br/>
                <div className="content" id="content">
                    {this.props.children}          
                </div>
            </div>
        );
    }
}


