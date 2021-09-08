import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import './styles.css';

class Manager extends Component {
  state = { eventos: [] }
  async componentDidMount() {
    const response = await api.get('/listEventos');
    this.setState({ eventos: response.data })
  }
  render() {
    const { eventos } = this.state;
    return (
      <>
        <div className="menu-temp">
          <a href="http://localhost:3000/new-participant">Participante</a>
          <a href="http://localhost:3000/new-manager">Organizador</a>
          <a href="http://localhost:3000/new-event">Evento</a>
          <a href="http://localhost:3000/">Login</a>
          <a href="http://localhost:3000/new-certificate">Gerar Certificado</a>
          <a href="http://localhost:3000/manager">Dash Organizador</a>
        </div>
        
        <div className="container">
          <h1>PÁGINA PRINCIPAL DO ORGANIZADOR</h1>
          <div className="listaItem">
            <div className="newEvent">
              <a href="http://localhost:3000/new-event"><h2>Criar Novo Evento</h2></a>
            </div>
          </div>
          <div className="listaItem">

            <input className="checkSimbol" type="checkbox" id="box1" />
            <div className="checkEventos">

              <label htmlFor="box1">
                <h2 className="titulo">{eventos.length} EVENTOS</h2>
              </label>

              <div className="listEvents">
                {eventos.map(evento => (
                  <li key={evento.id}>
                    <h2>
                      <strong>Título: </strong>
                      {evento.titulo}
                      <Link to={`/evento-info/${evento.id}`}>Editar</Link>
                    </h2>
                  </li>
                ))}
              </div>
              
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Manager;