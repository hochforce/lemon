import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import { Redirect } from 'react-router-dom';
import { Container, View } from './styles';
import { api } from '../../services/api';
import { Pagination } from './../../components/Pagination';

export default function Ativos(){
  const [redirect, setRedirect] = useState('');
  const [eventos, setEventos] = useState([]);
  const userId = localStorage.getItem("USER-ID");
  const [participante, setParticipante] = useState('');
  const [organizador, setOrganizador] = useState('');
  

  async function search () {
    const buscaCpf = await api.get(`/searchCpf/${userId}`);
    const cpf = buscaCpf.data.cpf;

    const buscaParticipante = await api.get(`/searchParticipant/${cpf}`);
    setParticipante(buscaParticipante.data);
    
    const buscaOrganizador = await api.get(`/searchOrganizador/${cpf}`);
    setOrganizador(buscaOrganizador);

    const buscaEventosCancelados = await api.get('/listEventosCancelados');
    setEventos(buscaEventosCancelados.data);
  }

  useEffect(() => {
    (async function() {
      search()
    })()
  }, [])

  return (
    <Container>

      {
      participante 
      ?
      <View>
        {Array.isArray(eventos) && eventos.map((evento)=>
          <Card 
          title={evento.titulo}
          description={evento.descricao}
          status={evento.status}
          
          />
        )}
      </View>

      : 

      <View>
        {Array.isArray(eventos) && eventos.map((evento)=>
          <Card 
          cardManager="true"
          title={evento.titulo}
          description={evento.descricao}
          status={evento.status}
          />
        )}
      </View>
      
      }

      <Pagination/>

        {redirect && <Redirect to={{ pathname: redirect }} />}
    </Container>
  )
}