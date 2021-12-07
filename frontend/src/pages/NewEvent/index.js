import React, { useState } from 'react';
import { Container, Content, View, ViewInputs } from "./styles"
import { Header } from './../../components/Header/index';
import Input from './../../components/Input/index';
import { Button } from "../../components/Button";

const NewEvent = ({ match, history }) => {
  const [redirect, setRedirect] = useState('');
  const [isOnline, setIsOnline] = useState(true);

  function handleLogOut() {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('organizador');
    localStorage.removeItem('USER-ID');
    setRedirect('/');
  }

  function handleUserInfo() {
    console.log("Exibir user info")
  }

  function handleGoBack() {
    history.push('/manager');
  }

  return (
    <Container>

      <Header
        user="manager"
        userLogged="Organizador"
        nameItem="Eventos"
        onClickLogout={() => handleLogOut()}
        onClickUsr={() => handleUserInfo()}
        back="true"
        goBack={() => handleGoBack()}
      />
      <Content>
        <ViewInputs>
          <Input
            label="Título"
            type="text"

          />
          <Input
            label="Descrição"
            type="text"

          />
          <Input
            label="Tipo"
            type="dropdown"

          />
          <Input
            label="Data início"
            type="text"

          />
          <Input
            label="Hora início"
            type="text"

          />
          <Input
            label="Data fim"
            type="text"

          />
          <Input
            label="Hora fim"
            type="text"

          />
          <input
            type="radio"
            name="isOnline"
            value={isOnline}
            onChange={event => setIsOnline(true)}
          />

          <label>Online</label>
          <input
            type="radio"
            name="isOnline"
            value={isOnline}
            onChange={event => setIsOnline(false)}
          />
          <label>Presencial</label>
          {!isOnline &&
            <>
              <Input
                label="Estado"
                type="text"

              />
              <Input
                label="Cidade"
                type="text"

              />
              <Input
                label="CEP"
                type="text"

              />
              <Input
                label="Logradouro"
                type="text"

              />
              <Input
                label="Número"
                type="text"

              />
              <Input
                label="Bairro"
                type="text"

              />
            </>
          }
          <View>
            <Button name="Cadastrar" onClick={console.log("handleSubmit")} />
          </View>
        </ViewInputs>
      </Content>
    </Container>
  )
}

export default NewEvent;