import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import { Redirect } from 'react-router-dom';
import { Container, View } from './styles';
import { api } from '../../services/api';

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

    const buscaEventosAtivos = await api.get('/listEventosAtivos');
    setEventos(buscaEventosAtivos.data);
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
          onClick={() => {
            setRedirect(`/inscricao/${evento.id}`)
          }}
          
          />
        )}
      </View>

      : 

      <View>
      <Card 
      creation="true"
      onClick={() => {
        setRedirect(`/new-event`)
      }}
      />
      
      <Card 
      cardManager="true"
      title="Título do Evento que será realizado no IFNMG - Arinos"
      description="Aqui ficará a descrição de cada evento, com informações iniciais sobre o acontecimento do mesmo."
      onClick={() => {
        setRedirect(`/evento-info`)
      }}
      cancel={() => {
        setRedirect(`/cancelar-evento`)
      }}
      />

      <Card 
      cardManager="true"
      title="Título do Evento que será realizado no IFNMG - Arinos"
      description="Aqui ficará a descrição de cada evento, com informações iniciais sobre o acontecimento do mesmo."
      onClick={() => {
        setRedirect(`/evento-info`)
      }}
      cancel={() => {
        setRedirect(`/cancelar-evento`)
      }}
      />
      
      </View>
      }
        {redirect && <Redirect to={{ pathname: redirect }} />}
    </Container>
  )
}