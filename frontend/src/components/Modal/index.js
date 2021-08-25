import { Container, Headerm, Title, Content, Icon } from './styles';
import { useState } from 'react';
import down from "../../assets/images/expand_more_black.svg";
import up from "../../assets/images/expand_less_black.svg";

export const Modal = ({ title, children, background }) => {

  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
      <Headerm
        background={background}
        onClick={() => setShowModal(!showModal)}>
        <Title>
          {title}
        </Title>
        <Icon>
          {!showModal ? <img src={down} alt="" /> : <img src={up} alt="" />}
        </Icon>
      </Headerm>
      <Content showModal={showModal}>
        {showModal && children}
      </Content>
    </Container>
  );
}