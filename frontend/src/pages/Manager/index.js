import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Header } from "../../components/Header";
import Active from '../EventosAtivos';
import Finish from '../EventosFinalizados';
import Canceled from '../EventosCancelados';
import { Container } from "./styles";
import Search from '../../components/Search';

const Manager = () => {
  const [redirect, setRedirect] = useState('');
  const [validation, setValidation] = useState({
    active: true,
    finish: false,
    canceled: false
  });
 
  function handleLogOut() {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('organizador');
    localStorage.removeItem('USER-ID');
    setRedirect('/');
  }

  function handleUserInfo(){
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
        onClick={(valid)=> {setValidation(valid)}}
        onClickLogout={()=>handleLogOut()}
        onClickUsr={()=>handleUserInfo()}
      />

      <Search />

      {validation.active && <Active /> }
      {validation.finish && <Finish /> }
      {validation.canceled && <Canceled /> }
      
      
      {redirect && <Redirect to={{ pathname: redirect }} />}
    </Container>
  )
}

export default Manager;