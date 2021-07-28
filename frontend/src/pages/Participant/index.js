import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { api } from '../../services/api';
import { Button, Menu, Layout, Breadcrumb, Card, Row, Col, Space } from 'antd';
import { EditOutlined, PoweroffOutlined } from '@ant-design/icons';
import './styles.css';
import logo from '../../assets/images/imgLogo.png';
import Ativos from '../EventosAtivos';
import Finalizados from '../EventosFinalizados';

const Participant = () => {
  const [participante, setParticipante] = useState('');
  const [eventos, setEventos] = useState([]);
  const userId = localStorage.getItem("USER-ID");
  const token = localStorage.getItem("TOKEN");
  const imgLogo = logo;
  const { Header, Content, Footer } = Layout;
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
      <Header className="header-menu">

        <Menu className="menu" mode="horizontal" style={{ borderRadius: "0px 0px 5px 5px" }}>

          <div className="menu-item" >
            <Row gutter={24}>
              <Col md={10} sm={24} xs={24}>
                {/* <Image src={imgLogo} alt="Logo do Site" style={{ width: 20 }} preview={false} /> */}
                <a href="/participant" title="Home">LEMON</a>
              </Col>
              <Col md={9} sm={24} xs={24}>
                <Menu.Item style={{color: "lawngreen"}} onClick={()=>{setMenuItem(1)}} key="1" className="item" title="Mostrar Eventos Ativos" >Eventos Ativos</Menu.Item>
              </Col>
              <Col md={5} sm={24} xs={24}>
                <Menu.Item style={{color: "lawngreen"}} onClick={()=>{setMenuItem(2)}} key="2" className="item" title="Mostrar Eventos Encerrados">Eventos Encerrados</Menu.Item>
              </Col>

            </Row>
          </div>
          <div className="user-info" style={{ paddingRight: 0 }}>
            <Row gutter={24}>
              <Col md={12} sm={24} xs={24} style={{ paddingRight: 0, textAlign: "right" }}>
                <p style={{ margin: "20px 0px 0px" }}>{participante.nome}</p>
              </Col>
              <Col md={12} sm={24} xs={24} >
                <Button
                  className="button-logout"
                  type="primary"
                  icon={<PoweroffOutlined />}
                  onClick={handleLogOut}
                  title="Desconectar do usuário atual"
                >Sair</Button>
              </Col>
            </Row>
          </div>
        </Menu>
        
      </Header>
      {/* <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}> */}
        
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