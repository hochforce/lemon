import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Header } from "../../components/Header";
import Active from '../EventosAtivos';
import Finish from '../EventosFinalizados';
import Canceled from '../EventosCancelados';
import { Container } from "./styles";
import Search from '../../components/Search';
import { api } from '../../services/api';
import { useEffect } from 'react';

const Manager = () => {
  const [events, setEvents] = useState([]);
  const [redirect, setRedirect] = useState('');
  const [validation, setValidation] = useState({
    active: true,
    finish: false,
    canceled: false
  });

  // async function search() {
  //   const search = await api.get(`/listEventosAtivos/`);
  //   setEvents(search.data);
  //   console.table(search.data);
  // }

  // useEffect(() => {
  //   search();
  // }, [])


  // const filterArray = (value) => {
  //   if ((value || "").length == 0)
  //     return events;

  //   var result = events.filter(function (item) {
  //     return (item || []).length > 0
  //       || item.name.indexOf(value) > -1
  //   });

  //   return result;
  // }

  function handleLogOut() {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('organizador');
    localStorage.removeItem('USER-ID');
    setRedirect('/');
  }

  function handleUserInfo() {
    setRedirect(`/manager-info/${localStorage.getItem('USER-ID')}`);
  }

  return (
    <Container>
      <Header
        user="manager"
        userLogged="Organizador"
        nameItem="Eventos"
        active={validation.active}
        finish={validation.finish}
        canceled={validation.canceled}
        onClick={(valid) => { setValidation(valid) }}
        onClickLogout={() => handleLogOut()}
        onClickUsr={() => handleUserInfo()}
      />
  
      <Search onClick={(value)=>setEvents(value)} />

      {validation.active && <Active events={events}/>}
      {validation.finish && <Finish />}
      {validation.canceled && <Canceled />}


      {redirect && <Redirect to={{ pathname: redirect }} />}
    </Container>
  )
}

export default Manager;