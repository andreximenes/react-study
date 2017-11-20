import React, { Component } from 'react';
import $ from 'jquery';
import Xinput from './components/Xinput';
import Xbutton from './components/Xbutton';
import PubSub from 'pubsub-js';

class FormularioAutor extends Component {
    constructor(){
        super();
        this.state = {lista : [], nome:'',email: ''};
        this.enviaForm = this.enviaForm.bind(this);
        this.setCampo = this.setCampo.bind(this);
    }

    enviaForm(evento) {
        console.log('enviaForm');
        evento.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/autores',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({nome: this.state.nome, email:this.state.email}),
            success: function(resposta) {
                PubSub.publish('novo-autor-cadastrado', resposta);
                this.setState({nome:'', email:''});
            }.bind(this),
            error: function() {
                console.log('erro');
            }
        });        
    }

    setCampo(nomeCampo, evento){
        var campo = {};
        campo[nomeCampo] = evento.target.value;
        this.setState(campo);
    }

    

    render(){
        return(
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <Xinput id="nome" type="text" name="nome" label="Nome" value={this.state.nome} onChange={this.setCampo.bind(this, 'nome')} />
                    <Xinput id="email" type="email" name="email" label="E-mail" value={this.state.email} onChange={this.setCampo.bind(this, 'email')} />
                    <Xbutton type="submit" label="Incluir" className="pure-button pure-button-primary"/>
                </form>
            </div>
        )
    }

}

class TabelaAutor extends Component {

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
                            <th>E-mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(function(autor){
                                return (
                                    <tr key={autor.id}>
                                        <td>{autor.id}</td>
                                        <td>{autor.nome}</td>
                                        <td>{autor.email}</td>
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

export default class AutorBox extends Component {

    constructor(){
        super();
        this.state = {
            lista:[]
        }
    }

    componentDidMount() {
        $.ajax({
            url: 'http://localhost:3000/autores',
            dataType: 'json',
            success: function(response){
                this.setState({lista:response});        
            }.bind(this)
        });

        PubSub.subscribe('novo-autor-cadastrado', function(topico, novoAutor){
            var listaAtualizada = this.state.lista;
            listaAtualizada.push(novoAutor);
            this.setState({lista: listaAtualizada});
        }.bind(this));
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de Autores</h1>
                </div>
                <br/>
                <div className="content" id="content">
                    <div>
                        <FormularioAutor/>
                        <TabelaAutor lista={this.state.lista}/>
                    </div>         
                </div>
            </div>
            
        )
    }

}