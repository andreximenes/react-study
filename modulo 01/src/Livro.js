import React, { Component } from 'react';
import $ from 'jquery';
import Xinput from './components/Xinput';
import Xbutton from './components/Xbutton';
import PubSub from 'pubsub-js';

class FormularioLivro extends Component {
    constructor(){
        super();
        this.state = {
            titulo: '',
            preco: '',
            autorId: ''
        }
    }
}


class TabelaLivro extends Component {
    
    constructor(){
        super();
    }

    render(){
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Autor</th>
                            <th>Preco</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(function(livro){
                                return (
                                    <tr key={livro.id}>
                                        <td>{livro.id}</td>
                                        <td>{livro.titulo}</td>
                                        <td>{livro.autor.nome}</td>
                                        <td>{livro.preco}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default class LivroBox extends Component {
    constructor() {
        super();
        this.state = {
            lista:[]
        }
    }

    componentDidMount(){
        $.ajax({
            url: "http://localhost:3000/livros",
            dataType: 'json',
            success: function(resposta){
                this.setState({lista:resposta});
            }.bind(this)
        });
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de Livros</h1>
                </div>
                <br/>
                <div className="content" id="content">
                    <div>
                        <TabelaLivro lista={this.state.lista}/>
                    </div>         
                </div>
            </div>
        )
    }

}
