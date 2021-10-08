import React, { useEffect, useState } from 'react';
import { Header } from "../../components/Header";
import Ativos from '../EventosAtivos';
import Finalizados from '../EventosFinalizados';
import { Container } from "./styles";

const Manager = () => {
  const [menuItem, setMenuItem] = useState('');
  const [validation, setValidation] = useState({
    active: false,
    finish: true,
    canceled: false
  });


  return (
    <Container>
      <Header
        user="manager"
        userLogged="Organizador"
        nameItem="Eventos"
        active={validation.active}
        finish={validation.finish}
        canceled={validation.canceled}
      />
      { menuItem === 1 ? <Ativos/> : <Finalizados/>}

      <footer style={{ textAlign: 'center' }}>Lemon ©2021 Created by Hugo Hoch</footer>
    </Container>
  )
}

export default Manager;