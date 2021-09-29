import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { api } from '../../services/api';
import { Button, Menu, Layout, Breadcrumb, Card, Row, Col, Space } from 'antd';
import { EditOutlined, PoweroffOutlined } from '@ant-design/icons';
import './styles.css';
import logo from '../../assets/images/imgLogo.png';
import Ativos from '../EventosAtivos';
import Finalizados from '../EventosFinalizados';
import { Header } from '../../components/Header';

const Participant = () => {
  const [participante, setParticipante] = useState('');
  const [eventos, setEventos] = useState([]);
  const userId = localStorage.getItem("USER-ID");
  const token = localStorage.getItem("TOKEN");
  const imgLogo = logo;
  const { Content, Footer } = Layout;
  const { Meta } = Card;
  const [redirect, setRedirect] = useState('');
  const [menuItem, setMenuItem] = useState('');
  

  async function search() {
    const buscaCPF = await api.get(`/searchCpf/${userId}`);
    const cpf = buscaCPF.data.cpf;

    const buscaParticipante = await api.get(`/searchParticipant/${cpf}`);
    setParticipante(buscaParticipante.data);

    const buscaEventos = await api.get('/listEventos');
    setEventos(buscaEventos.data);
    
  };
  useEffect(() => {
    (async function () {
      search()
    })()
  }, [])

  useEffect(() => {
    if (!token) {
      return;
    }
    setMenuItem(1);
    setRedirect('/participant');
  }, [token])

  function handleLogOut() {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('USER-ID');
    setRedirect('/');
  }
  
  return (

    <Layout className="layout">
      
      <Header 
      user="manager"
      userLogged="Organizador"
      nameItem="Eventos"
      />
        { menuItem === 1 ? <Ativos/> : <Finalizados/>}
        {/* <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          <div className="cards">
            {Array.isArray(eventos) && eventos.map((evento) =>
              <Space direction="horizontal">
                <Card
                  style={{ width: 350, borderRadius: 8, margin: 40, }}
                  className="card"
                  actions={[
                    <EditOutlined onClick={() => {setRedirect(`/inscricao/${evento.id}`)}} key="edit" />,
                  ]}
                >
                  <Meta
                    title={<p style={{color: "snow"}}>{evento.titulo}</p>}
                    description={<p style={{color: "grey"}}>{evento.descricao}</p>}
                  />
                </Card>
              </Space>
            )}
          </div>
        </div> */}

      {/* </Content> */}
      <Footer style={{ textAlign: 'center' }}>Lemon ©2021 Created by Hugo Hoch</Footer>
      {redirect && <Redirect to={{ pathname: redirect }} />}
    </Layout>
  )
}
export default Participant;