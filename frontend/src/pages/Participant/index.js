import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import './styles.css';

const Participant = () => {
  const [participante, setParticipante] = useState('');
  const [eventos, setEventos] = useState([]);
  const userId = localStorage.getItem("USER-ID");

  async function search() {
    const buscaCPF = await api.get(`/searchCpf/${userId}`);
    const cpf = buscaCPF.data.cpf;

    const buscaParticipante = await api.get(`/searchParticipant/${cpf}`);
    setParticipante(buscaParticipante.data);

    const buscaEventos = await api.get('/listEventos');
    console.log(buscaEventos.data);
    setEventos(buscaEventos.data);
  };
  useEffect(() => {
    (async function () {
      search()
    })()
  }, [])

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
        <h1>PÁGINA PRINCIPAL DO PARTICIPANTE</h1>
        <h3>Olá {participante.nome}!</h3>

        <div className="listaItem">

          <input className="checkSimbol" type="checkbox" id="box1" />
          <div className="checkEventos">

            <label htmlFor="box1">
              <h2 className="titulo">{eventos.length} EVENTOS</h2>
            </label>

            <div className="listEvents">
              { <table>
                {eventos.map(evento => (
                  <tr key={evento.id}>
                    <h2>
                      <strong>Título: </strong>
                      {evento.titulo}
                    </h2>
                  </tr>
                ))}
              </table>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Participant;