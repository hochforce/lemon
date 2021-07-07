import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Table, Dropdown, Button, Menu, Image, Layout } from 'antd';
import { InfoCircleOutlined, EllipsisOutlined } from '@ant-design/icons';
import './styles.css';
import logo from '../../assets/images/imgLogo.png';

const Participant = () => {
  const [participante, setParticipante] = useState('');
  const [eventos, setEventos] = useState([]);
  const userId = localStorage.getItem("USER-ID");
  const imgLogo = logo;
  const { Header } = Layout;

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

  return (
    <>
      <Layout >
        <Header className="header-menu" style={{ backgroundColor: 'white' }}>
          <Image 
          preview={false} 
          alt="Kothe" 
          src={imgLogo} 
          style={{width: 100}}
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
        </Header>
      </Layout>

      <div className='tabela'>
        <Table
          style={{ fontSize: 30, display: 'inline', paddingTop: 3000 }}
          size='large'
          columns={columns}
          dataSource={eventos}
        />
      </div>

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