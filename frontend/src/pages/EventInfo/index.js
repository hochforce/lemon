import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { api } from '../../services/api';
import { Modal } from '../../components/Modal';
import { Button, Menu, Layout, Row, Col, Result, } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

import { Headerm } from '../../components/Modal/styles';


const EventInfo = ({ match, history }) => {
  const [evento, setEvento] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [endereco, setEndereco] = useState('');
  const [parceria, setParceria] = useState('');
  const [recurso, setRecurso] = useState('');
  const [bolsa, setBolsa] = useState('');
  const { Header } = Layout;
  const [redirect, setRedirect] = useState('');
  const userId = localStorage.getItem("organizador");
  const token = localStorage.getItem("TOKEN");
  const [manager, setManager] = useState('');
  const [progressEvent, setProgressEvent] = useState(false);
  const [validate, setValidate] = useState({
    event: undefined,
    time: undefined,
    address: undefined,
    together: undefined,
    necessary: undefined,
    scholarship: undefined
  });

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

  async function handleChangeDescricao() {
    setProgressEvent(true);
    try {
      const res = await api.post(`/updates/${evento.id}`, evento);
      setValidate({ ...validate, event: true })
    } catch (err) {
      setValidate({ ...validate, event: false })
    }
    setProgressEvent(false);
  }

  async function handleChangeDataEHorario() {
    setProgressEvent(true);
    try {
      const res = await api.post(`/updatePeriodo/${periodo.id}`, periodo);
      setValidate({ ...validate, time: true })
    } catch (err) {
      setValidate({ ...validate, time: false })
    }
    setProgressEvent(false);
  }

  async function handleChangeLocal() {
    setProgressEvent(true);
    try {
      const res = await api.post(`/updateEndereco/${endereco.id}`, endereco);
      setValidate({ ...validate, address: true })
    } catch (err) {
      setValidate({ ...validate, address: false })
    }
    setProgressEvent(false);
  }

  async function handleChangeParceria() {
    setProgressEvent(true);
    try {
      const res = await api.post(`/updateParceria/${parceria.id}`, parceria);
      setValidate({ ...validate, together: true })
    } catch (err) {
      setValidate({ ...validate, together: false })
    }
    setProgressEvent(false);
  }

  async function handleChangeRecurso() {
    setProgressEvent(true);
    try {
      const res = await api.post(`/updateRecurso/${recurso.id}`, recurso);
      setValidate({ ...validate, necessary: true })
    } catch (err) {
      setValidate({ ...validate, necessary: false })
    }
    setProgressEvent(false);
  }

  async function handleChangeBolsa() {
    setProgressEvent(true);
    try {
      const res = await api.post(`/updateBolsa/${bolsa.id}`, bolsa);
      setValidate({ ...validate, scholarship: true })
    } catch (err) {
      setValidate({ ...validate, scholarship: false })
    }
    setProgressEvent(false);
  }

  async function search() {
    const buscaCPF = await api.get(`/searchCpf/${userId}`);
    const cpf = buscaCPF.data.cpf;

    const buscaOrganizador = await api.get(`/searchOrganizador/${cpf}`);
    setManager(buscaOrganizador.data);
  }
  useEffect(() => {
    (async function () {
      search()
    })()
  }, [])

  function handleLogOut() {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('organizador');
    setRedirect('/');
  }

  return (
    <>
      {!userId ?
        <Result
          status="403"
          title="403"
          subTitle="Desculpe, você não pode acessar essa página."
          extra={<Button type="primary" onClick={()=> history.push("/participant")}>Voltar</Button>}
        />
        
        :

        <div className="container">

          <div className="header-edicao">
            <div className="logo-edicao" >
              <a href="/manager">LEMON</a>
            </div>
            <div className="titulo-edicao">
              <h1>Edição de Evento</h1>
            </div>
            <div className="user-info-edicao">
              <p style={{ margin: "20px 0px 0px" }}>{manager.nome}</p>
              <Button
                className="button-logout-edicao"
                type="primary"
                icon={<PoweroffOutlined />}
                onClick={handleLogOut}
              >Sair</Button>
            </div>

          </div>

          <div className="eventoInfo">
            <Modal title="Descrição" background={validate.event}>
              <div className="content-modal">
                <div className="content-column">
                  <label>Título</label>
                  <input
                    type="text"
                    value={evento.titulo}
                    onChange={event => setEvento({ ...evento, titulo: event.target.value })}
                  />
                </div>

                <div className="content-column">
                  <label>Descrição</label>
                  <input
                    type="text"
                    value={evento.descricao}
                    onChange={event => setEvento({ ...evento, descricao: event.target.value })}
                  />
                </div>

                <div className="content-column">
                  <label>Tipo</label>
                  <input
                    type="text"
                    value={evento.tipo}
                    onChange={event => setEvento({ ...evento, tipo: event.target.value })}
                  />
                </div>
              </div>
              <button onClick={handleChangeDescricao} >
                {!progressEvent ? "Salvar" : <div className="loader"></div>}
              </button>
            </Modal>
            <Modal title="Data e Horário" background={validate.time}>
              <div className="content-modal">
                <div className="content-column">
                  <label>Início</label>
                  <input
                    type="datetime-local"
                    value={periodo.inicio}
                    onChange={event => setPeriodo({ ...periodo, inicio: event.target.value })}
                  />
                </div>

                <div className="content-column">
                  <label>Fim</label>
                  <input
                    type="datetime-local"
                    value={periodo.fim}
                    onChange={event => setPeriodo({ ...periodo, fim: event.target.value })}
                  />
                </div>
              </div>
              <button onClick={handleChangeDataEHorario} >
                {!progressEvent ? "Salvar" : <div className="loader"></div>}
              </button>
            </Modal>
            <Modal title="Local" background={validate.address}>
              <div className="content-column">
                <div className="content-column">
                  <label>Logradouro</label>
                  <input
                    type="text"
                    className="street"
                    value={endereco.logradouro}
                    onChange={event => setEndereco({ ...endereco, logradouro: event.target.value })}
                  />
                </div>

                <div className="content-modal">
                  <div className="content-column">
                    <label>Número</label>
                    <input
                      type="number"
                      value={endereco.numero}
                      onChange={event => setEndereco({ ...endereco, numero: event.target.value })}
                    />
                  </div>

                  <div className="content-column">
                    <label>Complemento</label>
                    <input
                      type="text"
                      value={endereco.complemento}
                      onChange={event => setEndereco({ ...endereco, complemento: event.target.value })}
                    />
                  </div>

                  <div className="content-column">
                    <label>Bairro</label>
                    <input
                      type="text"
                      value={endereco.bairro}
                      onChange={event => setEndereco({ ...endereco, bairro: event.target.value })}
                    />
                  </div>
                </div>

                <div className="content-modal">

                  <div className="content-column">
                    <label>Cidade</label>
                    <input
                      type="text"
                      value={endereco.cidade}
                      onChange={event => setEndereco({ ...endereco, cidade: event.target.value })}
                    />
                  </div>

                  <div className="content-column">
                    <label>Estado</label>
                    <input
                      type="text"
                      value={endereco.estado}
                      onChange={event => setEndereco({ ...endereco, estado: event.target.value })}
                    />
                  </div>

                  <div className="content-column">
                    <label>CEP</label>
                    <input
                      type="text"
                      value={endereco.cep}
                      onChange={event => setEndereco({ ...endereco, cep: event.target.value })}
                    />
                  </div>
                </div>
              </div>
              <button onClick={handleChangeLocal} >
                {!progressEvent ? "Salvar" : <div className="loader"></div>}
              </button>
            </Modal>
            <Modal title="Parceria" background={validate.together}>
              <div className="content-modal">
                <div className="content-column">
                  <label>Parceiro</label>
                  <input
                    type="text"
                    value={parceria.parceiro}
                    onChange={event => setParceria({ ...parceria, parceiro: event.target.value })}
                  />
                </div>

                <div className="content-column">
                  <label>Tipo de Parceria</label>
                  <input
                    type="text"
                    value={parceria.tipo_parceria}
                    onChange={event => setParceria({ ...parceria, tipo_parceria: event.target.value })}
                  />
                </div>

                <div className="content-column">
                  <label>Valor</label>
                  <input
                    type="text"
                    value={parceria.valor}
                    onChange={event => setParceria({ ...parceria, valor: event.target.value })}
                  />
                </div>
              </div>
              <button onClick={handleChangeParceria} >
                {!progressEvent ? "Salvar" : <div className="loader"></div>}
              </button>
            </Modal>
            <Modal title="Recursos" background={validate.necessary}>
              <div className="content-modal">
                <div className="content-column">
                  <label>Materiais</label>
                  <input
                    type="text"
                    value={recurso.materiais}
                    onChange={event => setRecurso({ ...recurso, materiais: event.target.value })}
                  />
                </div>

                <div className="content-column">
                  <label>Recursos humanos</label>
                  <input
                    type="text"
                    value={recurso.recursos_humanos}
                    onChange={event => setRecurso({ ...recurso, recursos_humanos: event.target.value })}
                  />
                </div>

                <div className="content-column">
                  <label>Instalações</label>
                  <input
                    type="text"
                    value={recurso.instalacoes}
                    onChange={event => setRecurso({ ...recurso, instalacoes: event.target.value })}
                  />
                </div>
              </div>
              <button onClick={handleChangeRecurso} >
                {!progressEvent ? "Salvar" : <div className="loader"></div>}
              </button>
            </Modal>
            <Modal title="Bolsas" background={validate.scholarship}>
              <div className="content-modal">

                <div className="content-column">
                  <label>Financiamento</label>
                  <input
                    type="text"
                    value={bolsa.financiamento}
                    onChange={event => setBolsa({ ...bolsa, financiamento: event.target.value })}
                  />
                </div>

                <div className="content-column">
                  <label>Tipo de bolsa</label>
                  <input
                    type="text"
                    value={bolsa.tipo_bolsa}
                    onChange={event => setBolsa({ ...bolsa, tipo_bolsa: event.target.value })}
                  />
                </div>
              </div>
              <button onClick={handleChangeBolsa} >
                {!progressEvent ? "Salvar" : <div className="loader"></div>}
              </button>
            </Modal>
          </div>

        </div>
      }
      {redirect && <Redirect to={{ pathname: redirect }} />}
    </>
  )
}

export default EventInfo;