import React, { useState } from 'react';
import { Container, Content, ViewButton, ViewInputs, ViewRadioButtons, ViewOptions, ViewHeader, ViewTime, ViewAddress } from "./styles"
import { Header } from './../../components/Header/index';
import Input from './../../components/Input/index';
import { Button } from "../../components/Button";
import { Breadcrumb } from './../../components/Breadcrumb/index';

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
      <Breadcrumb name=" > Cadastro de Evento"/>
      <Content>
        <ViewInputs>
          <ViewHeader>
            <Input
              label="Título"
              type="text"
            />
            <Input
              label="Descrição"
              type="text"

            />
            <select style={{borderRadius: 5, height: 50, border: "none"}}>
              <option value="1">Selecione</option>
              <option value="2">Opção</option>
              <option value="3">Total</option>
              <option value="4">Limite</option>
              <option value="5">Coisa</option>
            </select>
            <Input
              label="Tipo"
              type="dropdown"

            />
          </ViewHeader>
          <ViewTime>
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
          </ViewTime>
          <ViewRadioButtons>
            <label>Local</label>
            <ViewOptions>
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
            </ViewOptions>
          </ViewRadioButtons>
          {!isOnline &&
            <ViewAddress>
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
            </ViewAddress>
          }
          <ViewButton>
            <Button name="Cadastrar" onClick={console.log("handleSubmit")} />
          </ViewButton>
        </ViewInputs>
      </Content>
    </Container>
  )
}

export default NewEvent;