import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { Header } from "../../components/Header";
import Active from '../EventosAtivos';
import Finish from '../EventosFinalizados';
import Canceled from '../EventosCancelados';
import { Container } from "./styles";

const Manager = () => {
  const [redirect, setRedirect] = useState('');
  const [menuItem, setMenuItem] = useState('');
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
    console.log("Exibir user info")
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

      {validation.active && <Active /> }
      {validation.finish && <Finish /> }
      {validation.canceled && <Canceled /> }
      
      <footer style={{ textAlign: 'center' }}>Lemon ©2021 Created by Hugo Hoch</footer>

      {redirect && <Redirect to={{ pathname: redirect }} />}
    </Container>
  )
}

export default Manager;