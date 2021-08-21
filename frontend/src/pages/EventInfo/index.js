import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { api } from '../../services/api';
import { Modal } from '../../components/Modal';
import { Button, Menu, Layout, Row, Col, } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import './styles.css';


const EventInfo = ({ match }) => {
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
      <div className="container">
        <div className="header">
          <Header className="header-menu">

            <Menu className="menu" mode="horizontal" style={{ borderRadius: "0px 0px 5px 5px" }}>

              <div className="menu-item" >
                <Row gutter={24}>
                  <Col md={12} sm={24} xs={24}>
                    {/* <Image src={imgLogo} alt="Logo do Site" style={{ width: 20 }} preview={false} /> */}
                    <a href="/manager">LEMON</a>
                  </Col>
                  <Col md={12} sm={24} xs={24}>
                    
                  </Col>
                </Row>
              </div>
              <div className="user-info" style={{ paddingRight: 0 }}>
                <Row gutter={24}>
                  <Col md={12} sm={24} xs={24} style={{ paddingRight: 0, textAlign: "right" }}>
                    <p style={{ margin: "20px 0px 0px" }}>{manager.nome}</p>
                  </Col>
                  <Col md={12} sm={24} xs={24} >
                    <Button
                      className="button-logout"
                      type="primary"
                      icon={<PoweroffOutlined />}
                      onClick={handleLogOut}
                    >Sair</Button>
                  </Col>
                </Row>
              </div>
            </Menu>
          </Header>
        </div>
        
        <h1>Edição de Evento</h1>
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
                <label>Data Início</label>
                <input
                 type="date" 
                 value={periodo.data_inicio} 
                 onChange={event => setPeriodo({ ...periodo, tipo: event.target.value })} 
                />
              </div>

              <div className="content-column">
                <label>Hora Início</label>
                <input
                 type="time" 
                 value={periodo.hora_inicio} 
                 onChange={event => setPeriodo({ ...periodo, tipo: event.target.value })} 
                />
              </div>

              <div className="content-column">
                <label>Data Fim</label>
                <input
                 type="date" 
                 value={periodo.data_fim} 
                 onChange={event => setPeriodo({ ...periodo, tipo: event.target.value })} 
                />
              </div>

              <div className="content-column">
                <label>Hora Fim</label>
                <input
                 type="time" 
                 value={periodo.hora_fim}
                 onChange={event => setPeriodo({ ...periodo, tipo: event.target.value })}  
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
                <input type="text" className="street" value={endereco.logradouro} />
              </div>

              <div className="content-modal">
                <div className="content-column">
                  <label>Número</label>
                  <input type="number" value={endereco.numero} />
                </div>

                <div className="content-column">
                  <label>Complemento</label>
                  <input type="text" value={endereco.complemento} />
                </div>

                <div className="content-column">
                  <label>Bairro</label>
                  <input type="text" value={endereco.bairro} />
                </div>
              </div>

              <div className="content-modal">

                <div className="content-column">
                  <label>Cidade</label>
                  <input type="text" value={endereco.cidade} />
                </div>

                <div className="content-column">
                  <label>Estado</label>
                  <input type="text" value={endereco.estado} />
                </div>

                <div className="content-column">
                  <label>CEP</label>
                  <input type="text" value={endereco.cep} />
                </div>
              </div>
            </div>
          </Modal>
          <Modal title="Parceria" background={validate.together}>
            <div className="content-modal">
              <div className="content-column">
                <label>Parceiro</label>
                <input type="text" value={parceria.parceiro} />
              </div>

              <div className="content-column">
                <label>Tipo de Parceria</label>
                <input type="text" value={parceria.tipo_parceria} />
              </div>

              <div className="content-column">
                <label>Valor</label>
                <input type="text" value={parceria.valor} />
              </div>
            </div>
          </Modal>
          <Modal title="Recursos" background={validate.necessary}>
            <div className="content-modal">
              <div className="content-column">
                <label>Materiais</label>
                <input type="text" value={recurso.materiais} />
              </div>

              <div className="content-column">
                <label>Recursos humanos</label>
                <input type="text" value={recurso.recursos_humanos} />
              </div>

              <div className="content-column">
                <label>Instalações</label>
                <input type="text" value={recurso.instalacoes} />
              </div>
            </div>
          </Modal>
          <Modal title="Bolsas" background={validate.scholarship}>
            <div className="content-modal">

              <div className="content-column">
                <label>Financiamento</label>
                <input type="text" value={bolsa.financiamento} />
              </div>

              <div className="content-column">
                <label>Tipo de bolsa</label>
                <input type="text" value={bolsa.tipo_bolsa} />
              </div>
            </div>
          </Modal>
        </div>

      </div>
      {redirect && <Redirect to={{ pathname: redirect }} />}
    </>
  )
}

export default EventInfo;