import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { Button } from "../../components/Button";
import Input from "../../components/Input";
import { Header } from './../../components/Header/index';
import { Container, Content, View, ViewInputs, ViewError } from "./styles.js";
import { Breadcrumb } from '../../components/Breadcrumb';
import { ModalConfirm } from '../../components/ModalConfirm';


const ManagerInfo = ({ history }) => {

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
  const [cpf, setCpf] = useState('');
  const [campus_instituicao, setCampus_instituicao] = useState('');
  const [titulacao, setTitulacao] = useState('');
  const [cargo, setCargo] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [manager, setManager] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeatPass] = useState(null);
  const [idContact, setIdContact] = useState('');
  const { id } = useParams()
  

  async function search() {
    const searchCPF = await api.get(`/searchCpf/${id}`);
    const searchManager = await api.get(`/searchOrganizador/${searchCPF.data.cpf}`);
    setManager(searchManager.data);
    setNome(searchManager.data.nome);
    setSobrenome(searchManager.data.sobrenome);
    setCpf(searchManager.data.cpf);
    setCampus_instituicao(searchManager.data.campus_instituicao);
    setTitulacao(searchManager.data.titulacao);
    setCargo(searchManager.data.cargo);
    setIdContact(searchManager.data.id_contato);

    const searchContact = await api.get(`/searchContactById/${searchManager.data.id_contato}`)
    setTelefone(searchContact.data.telefone);
    setEmail(searchContact.data.email);
  };
  useEffect(() => {
    if (id) {
      search()
    }
  }, [])

  async function handleSubmit(e) {
    
    let idUser = localStorage.getItem('USER-ID')
    e.preventDefault();

    if (validate()) {
      await api.post(`/updateContact/${idContact}`, {
        telefone,
        email
      })
      await api.post(`/updateManager/${manager.id}`, {
        nome,
        sobrenome,
        campus_instituicao,
        titulacao,
        cargo,
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
    history.push('/manager');
  }

  function handleLogOut() {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('organizador');
    localStorage.removeItem('USER-ID');
    history.push('/');
  }

  function handleUserInfo() {
    history.push('/managerInfo');
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
        user="manager"
        userLogged="Organizador"
        nameItem="Eventos"
        onClickLogout={() => handleLogOut()}
        onClickUsr={() => handleUserInfo()}
        back="true"
        goBack={() => handleGoBack()}
      />
      <Breadcrumb name=" > Edição de organizador" />
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
            label="Titulação"
            type="text"
            value={titulacao}
            onChange={event => setTitulacao(event.target.value)}

          />

          <Input
            label="Cargo"
            type="text"
            value={cargo}
            onChange={event => setCargo(event.target.value)}

          />

          <Input
            label="Telefone"
            type="text"
            value={telefone}
            onChange={event => setTelefone(event.target.value)}

          />

          <Input
            label="E-mail"
            type="text"
            value={email}
            onChange={event => setEmail(event.target.value)}

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
            <Button name="Salvar" onClick={handleSubmit} />
          </View>


        </ViewInputs>


      </Content>
    </Container>
  )
}

export default ManagerInfo;