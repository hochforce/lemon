import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { Button } from "../../components/Button";
import Input from "../../components/Input";
import { Header } from './../../components/Header/index';
import { Container, Content, View, ViewInputs, ViewError } from "./styles.js";
import { Breadcrumb } from '../../components/Breadcrumb';
import { ModalConfirm } from '../../components/ModalConfirm';
import Relatorio from './../../components/Relatorio/index';

const UserInfo = ({ history }) => {

  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  });

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {

    setShowModal(prev => !prev)
  }

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [campus_instituicao, setCampus_instituicao] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeatPass] = useState(null);
  const [participant, setParticipant] = useState('');
  const [redirect, setRedirect] = useState('');
  const { id } = useParams()
  let idUser = localStorage.getItem('USER-ID')

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

  async function handleSubmit(e) {
    // e.preventDefault();

    if (validate()) {
      await api.post(`/updateUser/${id}`, {
        nome,
        sobrenome,
        campus_instituicao,
        password
      })
      await api.post(`/updateUserAuth/${idUser}`, {
        password
      })

      openModal();
      setTimeout(function () {
        document.location.reload(true)
      }, 3000)
    } else {
      return;
    }
  }

  function handleGoBack() {
    history.push('/participant');
  }

  function handleLogOut() {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('organizador');
    localStorage.removeItem('USER-ID');
    history.push('/');
  }

  function handleUserInfo() {
    setRedirect(`/user-info/${participant.id}`);
  }

  function validate() {
    if (repeatPass !== password) return setStatus({ type: 'error', mensagem: 'Erro: As senhas precisam ser iguais!' });
    return true;
  }

  return (
    <Container>
      <ModalConfirm
        showModal={showModal}
        setShowModal={setShowModal}
        message="Dados atualizados com sucesso!"
      />
      <Header
        basic="true"
        back="true"
        user="participant"
        userLogged="Participante"
        nameItem="Eventos"
        onClickLogout={() => handleLogOut()}
        onClickUsr={() => handleUserInfo()}
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

          <ViewError>
            {status.type === 'error' ? <p style={{ color: "tomato" }}>{status.mensagem}</p> : ""}
          </ViewError>

          <View>
            <Button name="Salvar" onClick={() => handleSubmit()} />
          </View>


        </ViewInputs>


      </Content>
      {redirect && <Redirect to={{ pathname: redirect }} />}
    </Container>
  )
}

export default UserInfo;