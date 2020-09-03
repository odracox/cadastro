import React, { Component } from 'react'
import axios from 'axios'
import Main from './Main'


const baseUrl = 'http://localhost:3001/users'

const initialState = {
    user: { name: '', email: '' },
    list: []
}

export default class UserCrud extends Component {

    state = { ...initialState }

    constructor(props) {
    
        super(props);
        this.state = {...initialState}

    }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    

    load(user) {

        this.setState({ user })
    }


    save() {

        const user = this.state.user
        // Se o user existir (ou seja, o id existe) eu
        // farei um PUT senao um POST (criar)
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
        .then(resp => {

            // Se eu consegui atualizar ou criar, preciso atualizar a minha lista
            const list =  this.state.list.filter(u => u.id !== resp.data.id)
            list.unshift(user)
            this.setState({ user: initialState.user, list})

        })
    }

    // Este usuario foi definido dentro do renderRows:
    // Eu mapeei cada objeto da lista (cada objeto é um user)
    // E pra cada componente excluir eu criei uma callback para
    // este evento com o user. Ou seja, 
    // Este 'user' está na memória do componente !!
    remove(user) {

        axios.delete(`${baseUrl}/${user.id}`).then(resp => {

            // Vou construir uma nova lista local com filter
            // O filter vai retornar apenas os outros users    
            const list = this.state.list.filter(u => u.id !== user.id)
            this.setState({list})

        })

        // No meu teste, o usuario foi removido da lista local
        // (interface) e do servidor json rodando na 3001 MAS
        // não removeu do arquivo db.json

    }


    updateField(event) {

        // Pego o usuario que foi selecionado
        const user = { ...this.state.user }
        // event.target.name pode ser:  name ou email
        // Entao posso ter: user[name] ou user[email]
        // name é o nome do atributo do input form e 
        // seu valor é value (que é o texto)
        user[event.target.name] = event.target.value

        //Assim atualizo o usuario da memoria 
        // e que é o estado da aplicacao causando
        // atualizacao da interface
        this.setState({ user })

        // Note esta funcao apenas atualiza o state mas 
        // nao atualiza a interface, note que qualquer coisa
        // que eu digitar vai vir pra cá. 
        // Desta forma o state fica pronto pra quando eu usar os
        // botoes salvar ou remover.

        console.log('user updated in state')

    }

    renderForm() {

        return (

            <div className="form">

                <div className="row m-2">

                    <div className="form-group">

                        <label>Name:</label>
                        <input type="text" className="form-control"
                            name="name"
                            value={this.state.user.name}
                            onChange={e => this.updateField(e)}
                        />

                    </div>

                    <div className="form-group pl-2">

                        <label>Email:</label>
                        <input type="text" className="form-control"
                            name="email"
                            value={this.state.user.email}
                            onChange={e => this.updateField(e)}
                        />

                    </div>


                </div>


                <hr />
                <div className="row">
                    <div className="d-flex ml-5">

                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Save
                        </button>
                        
                    </div>
                </div>

            </div>

        )

    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>E-mail</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }    

    renderRows() {

        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil bg-warning text-dark" 
                                
                            ></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash bg-danger text-dark"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    

    render() {
        
        return (
        
        <Main title= 'Usuarios'>

            {this.renderForm()}                                
            {this.renderTable()}

        </Main>
        )
    }
}