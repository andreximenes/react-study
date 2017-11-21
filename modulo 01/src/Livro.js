import React, { Component } from 'react';
import $ from 'jquery';
import Xinput from './components/Xinput';
import Xbutton from './components/Xbutton';
import PubSub from 'pubsub-js';

class FormularioLivro extends Component {
    constructor(){
        super();
        this.state = {
            autores: [],
            titulo: '',
            preco: '',
            autor: '',
            autorId: ''
        }
        
        this.setCampo = this.setCampo.bind(this);
        this.enviaForm = this.enviaForm.bind(this);
    }

    setCampo(nomeCampo, evento){
        var campo = {};
        campo[nomeCampo] = evento.target.value;
        this.setState(campo);
    }
    

    enviaForm(evento) {
        console.log(JSON.stringify({titulo: this.state.titulo, preco: this.state.preco, autorId: this.state.autorId}));
        evento.preventDefault();
        this.getAutorById(this.state.autorId);
        console.log("Autor selecionado: " , this.state.autor);
        $.ajax({
            url: 'http://localhost:3000/livros',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({titulo: this.state.titulo, preco: this.state.preco, autor: this.state.autor}),
            success: function(resposta) {
                PubSub.publish('novo-autor-cadastrado', resposta);
                this.setState({nome:'', email:''});
            }.bind(this),
            error: function() {
                console.log('erro');
            }
        });        
    }
    getAutorById(autorId){
        $.ajax({
            url: "http://localhost:3000/autores/"+autorId,
            dataType: 'json',
            success: function(resposta){
                var campo = {};
                campo['autor'] = resposta;
                this.setState(campo);
            }.bind(this)
        });

    }
    render() {

        return (

            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <Xinput id="titulo" type="text" name="titluo" label="Título" value={this.state.titulo} onChange={this.setCampo.bind(this, 'titulo')} />
                
                    <div className="pure-control-group">
                        <label for={this.state.autorId}>Autor</label>
                        <select id={this.state.autorId} name={this.state.autorId} onChange={this.setCampo.bind(this, 'autorId')}>
                            <option value=" ">Selecione um autor...</option>
                            {
                                this.props.autores.map(function(autor, i){
                                    return (
                                        <option key={i} value={autor.id}>{autor.nome}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    
                    <Xinput id="preco" type="number" name="preco" label="Preço" value={this.state.preco} onChange={this.setCampo.bind(this, 'preco')} />
                    
                    <Xbutton type="submit" label="Incluir" className="pure-button pure-button-primary"/>
                </form>
            </div>
        );
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
            lista:[],
            autores:[]
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

        $.ajax({
            url: "http://localhost:3000/autores",
            dataType: 'json',
            success: function(resposta){
                this.setState({autores:resposta});
                console.log(resposta);
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
                        <FormularioLivro autores={this.state.autores}/>
                        <TabelaLivro lista={this.state.lista}/>
                    </div>         
                </div>
            </div>
        )
    }

}
