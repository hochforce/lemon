import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { api } from '../../services/api';
import { Table, Dropdown, Button, Menu, Image, Layout, Breadcrumb, Card, Avatar } from 'antd';
import { InfoCircleOutlined, EllipsisOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons';
import './styles.css';
import logo from '../../assets/images/imgLogo.png';

const Participant = () => {
  const [participante, setParticipante] = useState('');
  const [eventos, setEventos] = useState([]);
  const userId = localStorage.getItem("USER-ID");
  const token = localStorage.getItem("TOKEN");
   const imgLogo = logo;
  const { Header, Content, Footer } = Layout;
  const { Meta } = Card;
  const [redirect, setRedirect] = useState('');

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

  const columns = [
    {
      title: 'Título',
      dataIndex: 'titulo',
      key: 'titulo',
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
    },
    {
      title: 'Inscrição',
      dataIndex: 'inscricao',
      key: 'inscricao',
      width: '7%',
      fixed: 'right',
      render: () => {
        return (
          <Dropdown overlay={''}>
            <Button type="text" className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              <EllipsisOutlined style={{ fontSize: '30px', transform: 'rotate(90deg)' }} />
            </Button>
          </Dropdown>
        );
      },
    }
  ]

  const handleClick = (e) => {
    console.log('click ', e);

  };

  useEffect(() => {
    if(!token){
      return;
    }
    setRedirect('/participant');
  }, [token])

  function handleLogOut() {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('USER-ID');
    setRedirect('/');
  }

  return (
    <>
      <Layout >
        {/* <Header className="header-menu" style={{ backgroundColor: 'white'  }}>
          <Image
            preview={false}
            alt="Kothe"
            src={imgLogo}
            style={{ width: 100 }}
          />

          <Menu
            onClick={handleClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="horizontal"
            theme='light'
          >

            <Menu.Item key="1">Eventos</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>

          </Menu>
        </Header> */}

        <Header className="header-menu" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu className="menu" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">Eventos disponíveis</Menu.Item>
            <Menu.Item key="2">Eventos "ativos e encerrados"</Menu.Item>
            <Menu.Item key="3">Eventos que participei</Menu.Item>
          </Menu>
        </Header>

        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Início</Breadcrumb.Item>
            <Breadcrumb.Item>Eventos</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>




            <Card
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title="Formatura"
                description="Formatura do Ensino Médio"
              />
            </Card>

            <button
              onClick={handleLogOut}
            >Sair</button>





            <div className='tabela'>
              <Table
                style={{ fontSize: 30, display: 'inline', paddingTop: 3000 }}
                size='large'
                columns={columns}
                dataSource={eventos}
              />
            </div>
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>Lemon ©2021 Created by Hugo Hoch</Footer>
        {redirect && <Redirect to ={{pathname: redirect}} /> }
      </Layout>


      {/* <div className="menu-temp">
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
      </div> */}
    </>
  )
}

export default Participant;