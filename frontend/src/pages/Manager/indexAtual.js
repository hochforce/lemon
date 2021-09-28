import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { api } from '../../services/api';
import { Button, Menu, Layout, Row, Col, } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import './styles.css';
import Ativos from '../EventosAtivos';
import Finalizados from '../EventosFinalizados';
import { Rodape } from '../../components/Rodape';

const Manager = () => {
  const [manager, setManager] = useState('');
  const [eventos, setEventos] = useState([]);
  const userId = localStorage.getItem("organizador");
  const token = localStorage.getItem("TOKEN");
  const { Header } = Layout;
  const [redirect, setRedirect] = useState('');
  const [menuItem, setMenuItem] = useState('');

  async function search() {
    const buscaCPF = await api.get(`/searchCpf/${userId}`);
    const cpf = buscaCPF.data.cpf;

    const buscaOrganizador = await api.get(`/searchOrganizador/${cpf}`);
    setManager(buscaOrganizador.data);

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
    setRedirect('/manager');
  }, [token])

  function handleLogOut() {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('organizador');
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
                <a href="/manager">LEMON</a>
              </Col>
              <Col md={9} sm={24} xs={24}>
                <Menu.Item style={{ color: "lawngreen" }} onClick={() => { setMenuItem(1) }} key="1" className="item" title="1" >Eventos Ativos</Menu.Item>
              </Col>
              <Col md={5} sm={24} xs={24}>
                <Menu.Item style={{ color: "lawngreen" }} onClick={() => { setMenuItem(2) }} key="2" className="item">Eventos Encerrados</Menu.Item>
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

      {menuItem === 1 ? <Ativos active={menuItem}/> : <Finalizados active={menuItem}/>}
      <Rodape />

      {redirect && <Redirect to={{ pathname: redirect }} />}
    </Layout>
  )
}
export default Manager;