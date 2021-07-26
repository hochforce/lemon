
import { Breadcrumb, Layout, Space, Card, Button } from 'antd';
import { DownloadOutlined  } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export default function Finalizados (){

  const { Content } = Layout;
  const { Meta } = Card;
  const [redirect, setRedirect ] = useState('');
  const [eventos, setEventos] = useState([]);
  const userId = localStorage.getItem("USER-ID");
  const [participante, setParticipante] = useState('');

  async function search() {
    const buscaCPF = await api.get(`/searchCpf/${userId}`);
    const cpf = buscaCPF.data.cpf;
    const buscaParticipante = await api.get(`/searchParticipant/${cpf}`);
    setParticipante(buscaParticipante.data);
    const buscaEventosFinalizados = await api.get('/listEventosFinalizados');
    setEventos(buscaEventosFinalizados.data);
  };

  useEffect(() => {
    (async function () {
      search()
    })()
  }, [])

  return(
    
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Início</Breadcrumb.Item>
          <Breadcrumb.Item>Eventos Encerrados</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          <div className="cards">
            {Array.isArray(eventos) && eventos.map((evento) =>
              <Space direction="horizontal">
                <Card
                  style={{ width: 350, borderRadius: 8, margin: 40, }}
                  className="card"
                  actions={[
                    <Button style={{backgroundColor:"lawngreen", border: "none", color: "darkgreen"}} type="primary" icon={<DownloadOutlined />} onClick={() => {setRedirect(`/new-certificate`)}}>Certificado</Button>
                  ]}
                >
                  <Meta
                    title={<p style={{color: "snow"}}>{evento.titulo}</p>}
                    description={<p style={{color: "white"}}>{evento.descricao}</p>}
                  />
                  
                </Card>
              </Space>
            )}
          </div>
        </div>
        {redirect && <Redirect to={{ pathname: redirect }} />}
      </Content>
  )
}