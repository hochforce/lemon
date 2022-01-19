import { Button } from "../Button";
import { Container, Content, View, Img, Title, Align, Description, ViewButton } from "./styles";

const Card = ({
  creation,
  cardManager,
  title,
  description,
  onClick,
  cancel,
  disabled,
  status }) => {

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
              <>
                {status === "cancelado" && <Button name="Reativar" onClick={onClick} />}
                {status === "ativo" &&
                  <Align>
                    <Button name="Editar" onClick={onClick} />
                    <Button name="Cancelar" onClick={cancel} />
                  </Align>
                }
                {status === "finalizado" && <Button name="Relatórios" />}
              </>
              :
              <>
                {status === "finalizado" && <Button name="Certificado" />}
                {status === "cancelado" && <Button name="Errado" onClick={onClick} />}
                <Button name="Inscrição" onClick={onClick} disabled={disabled} />
              </>
            }
          </View>
        }
      </Content>
    </Container>
  )
}

export default Card;