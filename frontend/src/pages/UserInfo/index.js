import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Button } from "../../components/Button";
import Input from "../../components/Input";
import { Header } from './../../components/Header/index';
import { Container, Content, P, View, ViewInputs } from "./styles.js";
import { Breadcrumb } from '../../components/Breadcrumb';


const UserInfo = ({ history, match }) => {

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [campus_instituicao, setCampus_instituicao] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeatPass] = useState(null);
  const [eventSubmit, setEventSubmit] = useState(false);
  const [cpfIsValid, setCpfIsValid] = useState(true);
  const [redirect, setRedirect] = useState('');
  const [participant, setParticipant] = useState('');

  const callUserInfo = async () => {
    const searchUser = await api.get(`/searchParticipantById/${match.params.id}`);
    setParticipant(searchUser.data);
  };

  async function handleSubmit(event) {
    console.log("Criar função edição no backend")
  }

  function handleGoBack() {
    history.push('/participant');
  }

  function handleLogOut() {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('organizador');
    localStorage.removeItem('USER-ID');
    setRedirect('/');
  }

  function handleUserInfo() {
    console.log("Exibir user info")
  }

  return (
    <Container>
      <Header
        user="participant"
        userLogged="Participante"
        nameItem="Eventos"
        onClickLogout={() => handleLogOut()}
        onClickUsr={() => handleUserInfo()}
        back="true"
        goBack={() => handleGoBack()}
      />
      <Breadcrumb name=" > Edição de participante" />
      <Content>
        <ViewInputs>
          <Input
            label="Nome"
            type="text"
            value={nome}
            onChange={event => setNome(event.target.value)}
            eventSubmit={eventSubmit}
          />

          <Input
            label="Sobrenome"
            type="text"
            value={sobrenome}
            onChange={event => setSobrenome(event.target.value)}
            eventSubmit={eventSubmit}
          />

          <Input
            label="CPF"
            type="text"
            value={cpf}
            onChange={event => setCpf(event.target.value)}
            eventSubmit={eventSubmit}
            message={!cpfIsValid ? "CPF invá" : "preencha isso"}
          />

          <Input
            label="Campus/Instituição"
            type="text"
            value={campus_instituicao}
            onChange={event => setCampus_instituicao(event.target.value)}
            eventSubmit={eventSubmit}
          />

          <Input
            label="Senha"
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            eventSubmit={eventSubmit}
          />

          <Input
            label="Repetir a Senha"
            type="password"
            value={repeatPass}
            onChange={event => setRepeatPass(event.target.value)}
            eventSubmit={eventSubmit}
          />

          <View>
            <Button name="Salvar" onClick={handleSubmit} />
          </View>


        </ViewInputs>
      </Content>
    </Container>
  )
}

export default UserInfo;