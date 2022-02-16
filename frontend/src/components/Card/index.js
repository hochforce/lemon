import { Button } from "../Button";
import { Container, Content, View, Title, Align, Description, Error } from "./styles";

const Card = ({
  cardManager,
  title,
  description,
  onClick,
  disabled,
  status,
  haveSub,
  message }) => {

  return (
    <Container onClick={onClick}>
      <Content >

        <View>
          <Title>{title}</Title>
          <Description>{description}</Description>
          {cardManager
            ?
            <>
              {status === "cancelado" && <Button name="Reativar" onClick={onClick} />}
              {status === "ativo" &&
                <Button name="Acesse" onClick={onClick} />
              }
              {status === "finalizado" && <Button name="Relatórios" />}
            </>
            :
            <>
              {status === "finalizado" && <Button name="Certificado" onClick={onClick} />}
              {status === "ativo" &&
                <Button name={haveSub ? "Inscrito" : "Inscrição"} onClick={onClick} disabled={disabled} haveSub={haveSub} />
              }
            </>
          }
          <Error><p>{message}</p></Error>
        </View>

      </Content>
    </Container>
  )
}

export default Card;