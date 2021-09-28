import { useState } from "react";
import { Header } from "../../components/Header";
import { Container } from "./styles";

const Manager = () => {
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


    </Container>
  )
}

export default Manager;