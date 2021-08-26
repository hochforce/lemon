
import { Breadcrumb, Layout, Space, Card, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export default function Ativos() {

  const { Content } = Layout;
  const { Meta } = Card;
  const [redirect, setRedirect] = useState('');
  const [eventos, setEventos] = useState([]);
  const userId = localStorage.getItem("USER-ID");
  const [participante, setParticipante] = useState('');
  const [organizador, setOrganizador] = useState('');
  const [checkInscricao, setCheckInscricao] = useState('');
  const [cpf, setCpf] = useState('');

  const searchEvent = async () => {
    const buscaEventosAtivos = await api.get('/listEventosAtivos');
    setEventos(buscaEventosAtivos.data);

  }

  const searchCpf = async () => {
    const buscaCPF = await api.get(`/searchCpf/${userId}`);
    setCpf(buscaCPF.data.cpf)

  }

  const searchParticipant = async () => {
    const buscaParticipante = await api.get(`/searchParticipant/${cpf}`);
    setParticipante(buscaParticipante.data);
    console.log("CPF: ", cpf)
  };

  const searchOrganizador = async () => {
    const buscaOrganizador = await api.get(`/searchOrganizador/${cpf}`);
    setOrganizador(buscaOrganizador);
  }
  // const searchInscricao = async () => {
  //   const buscaInscricao = await api.get(`/searchInscricao/${participante.id}`);
  //   setCheckInscricao(buscaInscricao.data);

  // }
  // console.log("TremB: ", eventos.map((event) => event.id === checkInscricao.id_evento))




  useEffect(() => {

  }, [])


  useEffect(() => {
    (() => {
      searchEvent()
      searchCpf()
      searchParticipant()
      searchOrganizador()
      // searchInscricao()
    })()
  }, [])

  return (

    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Início</Breadcrumb.Item>

        <Breadcrumb.Item>Eventos Ativos</Breadcrumb.Item>
      </Breadcrumb>


      {
        participante ?

          <div className="site-layout-background" style={{ padding: 24, minHeight: 380, borderRadius: 5 }}>
            <div className="cards">

              {Array.isArray(eventos) && eventos.map((evento) =>
                <Space direction="horizontal">
                  <Card
                    style={{
                      width: 350,
                      borderRadius: 8,
                      margin: 40,
                    }}
                    className="card"
                    actions={[
                      // {checkInscricao.id_participante === participante.id && eventos.map((event)=>{event.id === checkInscricao.id_evento})  ? 
                      //   : 

                      // }
                      // <Button
                      //   style={{
                      //     backgroundColor: "lawngreen",
                      //     border: "none",
                      //     color: "darkgreen"
                      //   }}
                      //   type="primary"
                      //   icon={<EditOutlined />}
                      //   onClick={() => {
                      //     setRedirect(`/inscricao/${evento.id}`)
                      //   }}>
                      //   Inscrever
                      // </Button>
                      <Button
                        style={{
                          backgroundColor: "lawngreen",
                          border: "none",
                          color: "darkgreen"
                        }}
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                          setRedirect(`/inscricao/${evento.id}`)
                        }}>
                        Inscrever
                      </Button>
                    ]}
                  >
                    <Meta
                      title={
                        <p style={{
                          color: "snow"
                        }}>
                          {evento.titulo}
                        </p>
                      }
                      description={
                        <p style={{
                          color: "white"
                        }}>
                          {evento.descricao}
                        </p>
                      }
                    />
                  </Card>
                </Space>
              )}
            </div>
          </div>

          :
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380, borderRadius: 5 }}>
            <a href="/new-event" className="novo-evento">+ NOVO EVENTO</a>
            <div className="cards">
              {Array.isArray(eventos) && eventos.map((evento) =>
                <Space direction="horizontal">
                  <Card
                    style={{
                      width: 350,
                      borderRadius: 8,
                      margin: 40,
                    }}
                    className="card"
                    actions={[
                      <Button
                        style={{
                          backgroundColor: "lawngreen",
                          border: "none",
                          color: "darkgreen"
                        }}
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                          setRedirect(`/evento-info/${evento.id}`)
                        }}>
                        Editar
                      </Button>,
                      <Button
                        style={{
                          backgroundColor: "lawngreen",
                          border: "none",
                          color: "darkgreen"
                        }}
                        type="primary"
                        icon={<DeleteOutlined />}
                        onClick={() => {
                          setRedirect(`/evento-info/${evento.id}`)
                        }}>
                        Excluir
                      </Button>
                    ]}
                  >
                    <Meta
                      title={
                        <p style={{
                          color: "snow"
                        }}>
                          {evento.titulo}
                        </p>
                      }
                      description={
                        <p style={{
                          color: "white"
                        }}>
                          {evento.descricao}
                        </p>
                      }
                    />
                  </Card>
                </Space>
              )}
            </div>
          </div>}
      {redirect && <Redirect to={{ pathname: redirect }} />}
    </Content>

  )
}