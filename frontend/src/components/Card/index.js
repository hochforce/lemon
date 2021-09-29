import { Button } from "../Button";
import { Container, Content, View, Img, Title, Align, Description, ViewButton } from "./styles"

const Card = ({ creation, cardManager, title, description, onClick, cancel}) => {
  

  return (
    <Container creation={creation}>
      <Content >

        {creation 
          ? 
            <ViewButton onClick={onClick}>
               <Img /> <Title>Novo Evento</Title>
             </ViewButton>
          :
            <View>
              <Title>{title}</Title>
              <Description>{description}</Description>

              {cardManager
                ?

                <Align>
                  <Button name="Editar" onClick={onClick}/>
                  <Button name="Cancelar" onClick={cancel}/>
                </Align>
                :
                <Button name="Inscrição" onClick={onClick}/>
              }
            </View>
        }
      </Content>
    </Container>
  )
}

export default Card;