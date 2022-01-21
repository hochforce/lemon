import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { Button } from "../../components/Button";
import Input from "../../components/Input";
import { Header } from './../../components/Header/index';
import { Container, Content, P, View, ViewInputs } from "./styles.js";
import { Breadcrumb } from '../../components/Breadcrumb';
import { ModalConfirm } from '../../components/ModalConfirm';


const UserInfo = ({ history, match }) => {

  const [ showModal, setShowModal ] = useState(false);
  const openModal = ()=>{
    
    setShowModal(prev => !prev)
  }

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [campus_instituicao, setCampus_instituicao] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeatPass] = useState(null);
  const [cpfIsValid, setCpfIsValid] = useState(true);
  const [redirect, setRedirect] = useState('');
  const [participant, setParticipant] = useState('');
  const { id } = useParams()

  async function search() {
    const searchUser = await api.get(`/searchParticipantById/${id}`);
    setParticipant(searchUser.data);
    setNome(searchUser.data.nome);
    setSobrenome(searchUser.data.sobrenome);
    setCpf(searchUser.data.cpf);
    setCampus_instituicao(searchUser.data.campus_instituicao);
  };
  useEffect(() => {
    if (id) {
      search()
    }
  }, [])

  // useEffect(() => {
  //   async function search() {
  //     const searchUser = await api.get(`/searchParticipantById/${match.params.id}`);
  //     setParticipant(searchUser.data);
  //     setNome(participant.nome);
  //     setSobrenome(participant.sobrenome);
  //   }
  //   search();
  // }, []);

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

          />

          <Input
            label="Sobrenome"
            type="text"
            value={sobrenome}
            onChange={event => setSobrenome(event.target.value)}

          />

          <Input
            label="CPF"
            type="text"
            value={cpf}
            onChange={event => setCpf(event.target.value)}
            disabled="true"
          />

          <Input
            label="Campus/Instituição"
            type="text"
            value={campus_instituicao}
            onChange={event => setCampus_instituicao(event.target.value)}

          />

          <Input
            label="Nova senha"
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}

          />

          <Input
            label="Repetir a Senha"
            type="password"
            value={repeatPass}
            onChange={event => setRepeatPass(event.target.value)}

          />

          <View>
            <Button name="Salvar" onClick={handleSubmit, openModal} />
          </View>


        </ViewInputs>


      <ModalConfirm showModal={showModal} setShowModal={setShowModal}/>
      </Content>
    </Container>
  )
}

export default UserInfo;