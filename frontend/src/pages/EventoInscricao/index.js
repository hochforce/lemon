import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { api } from '../../services/api';
import { Modal } from '../../components/Modal';
import { Button, Menu, Layout, Row, Col, } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import './styles.css';

const EventInscricao = ({ match }) => {
  const [evento, setEvento] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [endereco, setEndereco] = useState('');
  const [parceria, setParceria] = useState('');
  const [recurso, setRecurso] = useState('');
  const [bolsa, setBolsa] = useState('');
  const { Header } = Layout;
  const [redirect, setRedirect] = useState('');
  const userId = localStorage.getItem("USER-ID");
  const token = localStorage.getItem("TOKEN");
  const [participante, setParticipante] = useState('');
  const [progressEvent, setProgressEvent] = useState(false);
  const [validate, setValidate] = useState({
    event: undefined,
    time: undefined,
    address: undefined,
    together: undefined,
    necessary: undefined,
    scholarship: undefined
  });
  async function search() {
    const buscaCPF = await api.get(`/searchCpf/${userId}`);
    const cpf = buscaCPF.data.cpf;

    const buscaParticipante = await api.get(`/searchParticipant/${cpf}`);
    setParticipante(buscaParticipante.data);

  }

  useEffect(() => {
    (async function () {
      search()
    })()
  }, [])

  const callEventos = async () => {
    const buscaEventos = await api.get(`/listEventos/${match.params.id}`);
    setEvento(buscaEventos.data);
  };

  const callPeriodos = async () => {
    const buscaPeriodos = await api.get(`/listPeriodos/${evento.id_periodo_duracao}`);
    setPeriodo(buscaPeriodos.data);
  }

  const callEnderecos = async () => {
    const buscaEnderecos = await api.get(`/listEnderecos/${evento.id_endereco}`);
    setEndereco(buscaEnderecos.data);
  }

  const callParcerias = async () => {
    const buscaParceria = await api.get(`/listParcerias/${evento.id_parceria}`);
    setParceria(buscaParceria.data);
  }

  const callRecursos = async () => {
    const buscaRecurso = await api.get(`/listRecursos/${evento.id_recurso}`);
    setRecurso(buscaRecurso.data);
  }

  const callBolsas = async () => {
    const buscaBolsa = await api.get(`/listRecursos/${evento.id_recurso}`);
    setRecurso(buscaBolsa.data);
  }

  useEffect(() => {
    (() => {
      callEventos()
    })()
  }, [])

  useEffect(() => {
    (() => {
      callPeriodos()
      callEnderecos()
      callParcerias()
      callRecursos()
    })()
  }, [evento])




  function handleLogOut() {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('USER-ID');
    setRedirect('/');
  }

  async function handleSubscribe() {
    setProgressEvent(true);
    try{
      await api.post('/inscricoes', {
        id_evento: evento.id,
        id_participante: participante.id
      });
    }catch{

    }
    setProgressEvent(false);
    setRedirect('/participant');
  }

  return (
    <>
      <div className="container">

        <div className="header-inscricao">
          <div className="logo-inscricao" >
            <a href="/participant">LEMON</a>
          </div>
          <div className="titulo-inscricao">
            <h1>Inscrição no Evento</h1>
          </div>
          <div className="user-info-inscricao">
            <p style={{ margin: "20px 0px 0px" }}>{participante.nome}</p>
            <Button
              className="button-logout-inscricao"
              type="primary"
              icon={<PoweroffOutlined />}
              onClick={handleLogOut}
            >Sair</Button>
          </div>

        </div>

        <div className="eventoInfo">

          <h2>{evento.titulo}</h2>

          <h3>Duração</h3>
          <p><strong>Início:</strong> {periodo.data_inicio} às {periodo.hora_inicio} horas</p>
          <p><strong>Término:</strong> {periodo.data_fim} às {periodo.hora_fim} horas</p>

          <h3>Local</h3>
          <p><strong>Logradouro:</strong> {endereco.logradouro}, Número: {endereco.numero}</p>
          <p><strong>Bairro:</strong> {endereco.bairro}, Cidade: {endereco.cidade}, Estado: {endereco.estado}</p>
          <button onClick={handleSubscribe}>
            {!progressEvent ? "Confirmar Inscrição" : <div className="loader"></div>}
          </button>
          {/* <Modal title="Descrição" background={validate.event}>
            <div className="content-modal">
              <div className="content-column">
                <label>Título</label>
                <input
                  type="text"
                  value={evento.titulo}

                />
              </div>

              <div className="content-column">
                <label>Descrição</label>
                <input
                  type="text"
                  value={evento.descricao}

                />
              </div>

              <div className="content-column">
                <label>Tipo</label>
                <input
                  type="text"
                  value={evento.tipo}

                />
              </div>
            </div>

          </Modal>
          <Modal title="Data e Horário" background={validate.time}>
            <div className="content-modal">
              <div className="content-column">
                <label>Data Início</label>
                <input
                  type="date"
                  value={periodo.data_inicio}

                />
              </div>

              <div className="content-column">
                <label>Hora Início</label>
                <input
                  type="time"
                  value={periodo.hora_inicio}

                />
              </div>

              <div className="content-column">
                <label>Data Fim</label>
                <input
                  type="date"
                  value={periodo.data_fim}

                />
              </div>

              <div className="content-column">
                <label>Hora Fim</label>
                <input
                  type="time"
                  value={periodo.hora_fim}

                />
              </div>
            </div>

          </Modal>
          <Modal title="Local" background={validate.address}>
            <div className="content-column">
              <div className="content-column">
                <label>Logradouro</label>
                <input
                  type="text"
                  className="street"
                  value={endereco.logradouro}

                />
              </div>

              <div className="content-modal">
                <div className="content-column">
                  <label>Número</label>
                  <input
                    type="number"
                    value={endereco.numero}

                  />
                </div>

                <div className="content-column">
                  <label>Complemento</label>
                  <input
                    type="text"
                    value={endereco.complemento}

                  />
                </div>

                <div className="content-column">
                  <label>Bairro</label>
                  <input
                    type="text"
                    value={endereco.bairro}

                  />
                </div>
              </div>

              <div className="content-modal">

                <div className="content-column">
                  <label>Cidade</label>
                  <input
                    type="text"
                    value={endereco.cidade}

                  />
                </div>

                <div className="content-column">
                  <label>Estado</label>
                  <input
                    type="text"
                    value={endereco.estado}

                  />
                </div>

                <div className="content-column">
                  <label>CEP</label>
                  <input
                    type="text"
                    value={endereco.cep}

                  />
                </div>
              </div>
            </div>

          </Modal> */}
          {/* <Modal title="Parceria" background={validate.together}>
            <div className="content-modal">
              <div className="content-column">
                <label>Parceiro</label>
                <input
                  type="text"
                  value={parceria.parceiro}

                />
              </div>

              <div className="content-column">
                <label>Tipo de Parceria</label>
                <input
                  type="text"
                  value={parceria.tipo_parceria}

                />
              </div>

              <div className="content-column">
                <label>Valor</label>
                <input
                  type="text"
                  value={parceria.valor}

                />
              </div>
            </div>

          </Modal>
          <Modal title="Recursos" background={validate.necessary}>
            <div className="content-modal">
              <div className="content-column">
                <label>Materiais</label>
                <input
                  type="text"
                  value={recurso.materiais}

                />
              </div>

              <div className="content-column">
                <label>Recursos humanos</label>
                <input
                  type="text"
                  value={recurso.recursos_humanos}

                />
              </div>

              <div className="content-column">
                <label>Instalações</label>
                <input
                  type="text"
                  value={recurso.instalacoes}

                />
              </div>
            </div>

          </Modal>
          <Modal title="Bolsas" background={validate.scholarship}>
            <div className="content-modal">

              <div className="content-column">
                <label>Financiamento</label>
                <input
                  type="text"
                  value={bolsa.financiamento}

                />
              </div>

              <div className="content-column">
                <label>Tipo de bolsa</label>
                <input
                  type="text"
                  value={bolsa.tipo_bolsa}

                />
              </div>
            </div>

          </Modal> */}
        </div>

      </div>
      {redirect && <Redirect to={{ pathname: redirect }} />}
    </>
  )
}

export default EventInscricao;