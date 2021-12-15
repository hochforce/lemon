import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { api } from '../../services/api';
import Active from '../EventosAtivos';
import Finish from '../EventosFinalizados';
import { Header } from '../../components/Header';
import { Container } from './styles';

const Participant = () => {
  const [participante, setParticipante] = useState('');
  const [eventos, setEventos] = useState([]);
  const userId = localStorage.getItem("USER-ID");
  const token = localStorage.getItem("TOKEN");
  const [redirect, setRedirect] = useState('');
  const [menuItem, setMenuItem] = useState('');
  const [validation, setValidation] = useState({
    active: true,
    finish: false
  });
  

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

  function handleUserInfo(){
    setRedirect(`/user-info/${userId}`);
  }
  
  return (
    <Container>
      <Header 
        user="participant"
        userLogged="Participante"
        nameItem="Eventos"
        active={validation.active}
        finish={validation.finish}
        
        onClick={(valid)=> {setValidation(valid)}}
        onClickLogout={()=>handleLogOut()}
        onClickUsr={()=>handleUserInfo()}
      />

      {validation.active && <Active /> }
      {validation.finish && <Finish /> }
      
      
      
      {redirect && <Redirect to={{ pathname: redirect }} />}
    </Container>
  )
}
export default Participant;