import { Header } from "../../components/Header";
import { Container } from "./styles";

const Manager = ()=>{
  return (
    <Container>
      <Header 
      user="manager"
      userLogged="Organizador"
      nameItem="Eventos"
      />

    </Container>
  )
}

export default Manager;