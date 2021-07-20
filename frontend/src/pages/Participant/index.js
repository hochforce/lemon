import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { api } from '../../services/api';
import { Dropdown, Button, Menu, Layout, Breadcrumb, Card, Row, Col, Space, Image } from 'antd';
import { EllipsisOutlined, EditOutlined, PoweroffOutlined } from '@ant-design/icons';
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


  };

  useEffect(() => {
    if (!token) {
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

    <Layout className="layout">
      <Header className="header-menu" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>

        <Menu className="menu" mode="horizontal" defaultSelectedKeys={['1']}>

          <div className="menu-item">
            <Row gutter={24}>
              <Col md={2} sm={24} xs={24}>
                <Image src={imgLogo} alt="Logo do Site" style={{ width: 20, marginTop: 11 }} preview={false} />
              </Col>

              <Col md={7} sm={24} xs={24}>
                <Menu.Item key="1" onClick={() => { console.log("Funcionou!Menu")}} className="item" >Eventos Disponíveis</Menu.Item>
              </Col>
              <Col md={7} sm={24} xs={24}>
                <Menu.Item key="2" className="item">Eventos "abertos encerrados"</Menu.Item>
              </Col>
              <Col md={7} sm={24} xs={24}>
                <Menu.Item key="3" className="item">Eventos que participei</Menu.Item>
              </Col>
            </Row>
          </div>



          <div className="participante-info">
            <Row gutter={24}>
              <Col md={12} sm={24} xs={24}>
                <p style={{marginTop: 20}}>{participante.nome}</p>
              </Col>
              <Col md={12} sm={24} xs={24}>
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
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Início</Breadcrumb.Item>
          <Breadcrumb.Item>Eventos</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>



          <div className="cards">

            {Array.isArray(eventos) && eventos.map((evento) =>
              <Space direction="horizontal">
                <Card
                  style={{ width: 350, borderRadius: 8, margin: 40, }}

                  className="card"
                  actions={[
                    <EditOutlined onClick={() => { console.log("Funcionou!") }} key="edit" />,
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
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>Lemon ©2021 Created by Hugo Hoch</Footer>
      {redirect && <Redirect to={{ pathname: redirect }} />}
    </Layout>

  )
}

export default Participant;