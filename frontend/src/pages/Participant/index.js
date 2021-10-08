import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { api } from '../../services/api';
import Ativos from '../EventosAtivos';
import Finalizados from '../EventosFinalizados';
import { Header } from '../../components/Header';
import { Container } from './styles';

const Participant = () => {
  const [participante, setParticipante] = useState('');
  const [eventos, setEventos] = useState([]);
  const userId = localStorage.getItem("USER-ID");
  const token = localStorage.getItem("TOKEN");
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
    <Container>
      <Header 
      user="manager"
      userLogged="Organizador"
      nameItem="Eventos"
      />

      { menuItem === 1 ? <Ativos/> : <Finalizados/>} 

      <footer style={{ textAlign: 'center' }}>Lemon ©2021 Created by Hugo Hoch</footer>

      {redirect && <Redirect to={{ pathname: redirect }} />}
    </Container>
  )
}
export default Participant;