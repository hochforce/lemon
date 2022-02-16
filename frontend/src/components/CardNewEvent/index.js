import { Container, Content, Img, Title, ViewButton } from "./styles";

const CardNewEvent = ({onClick}) => {

  return (
    <Container>
      <Content >
          <ViewButton onClick={onClick}>
            <Img /> <Title>Novo Evento</Title>
          </ViewButton>
      </Content>
    </Container>
  )
}

export default CardNewEvent;