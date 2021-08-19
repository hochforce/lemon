import { Container, Header, Title, Content } from './styles';
import { useState } from 'react';

export const Modal = ({ title, children, background }) => {

  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
      <Header
        background={background}
        onClick={() => setShowModal(!showModal)}>
        <Title>{title}</Title>

      </Header>
      <Content showModal={showModal}>
        {showModal && children}
      </Content>
    </Container>
  );
}