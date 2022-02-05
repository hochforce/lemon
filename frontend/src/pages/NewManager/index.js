import React, { useRef, useState } from 'react';
import { Container, Content, P, View, ViewInputs, ViewError } from "./styles.js";
import { api } from '../../services/api';
import { ModalConfirm } from './../../components/ModalConfirm/index';
import Input from "../../components/Input";
import { Header } from './../../components/Header/index';
import { Link } from 'react-router-dom';
import { Button } from "../../components/Button";
import { validaCpf } from '../../components/CPFValidate';

export default function NewManager({ history }) {

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {

    setShowModal(prev => !prev)
  }
  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  });
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');
  const [campus_instituicao, setCampus_instituicao] = useState('');
  const [titulacao, setTitulacao] = useState('');
  const [cargo, setCargo] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeatPass] = useState('');


  async function addUser(event) {
    event.preventDefault();
    if (validate()) {
      if (!validaCpf(cpf)) {
        return setStatus({ type: 'error', mensagem: 'Erro: Insira um CPF válido. (Digite somente os números)!' });
      } else {
        try {
          //Salvando na tabela contatos
          const saveContact = await api.post('/contatos', {
            telefone,
            email,
          });

          //Pegando o id_contact
          const id_contato = saveContact.data.id;
          console.log(id_contato);


          //Salvando na tabela organizadores
          await api.post('/organizadores', {
            id_contato,
            nome,
            sobrenome,
            cpf,
            campus_instituicao,
            titulacao,
            cargo,
            password
          });

          const saveManager = await api.post('/user-auth', {
            cpf,
            password,
            "tipo": "organizador"
          })

          openModal();
          setTimeout(function () {
            history.push('/');
          }, 3000)
        } catch {
          return setStatus({ type: 'error', mensagem: 'Erro: Este CPF já está cadastrado, volte para a tela de login.' });
        }
      }
    }
  }

  function validate() {
    if (!nome) return setStatus({ type: 'error', mensagem: 'Erro: Necessário preencher o campo nome!' });
    if (!sobrenome) return setStatus({ type: 'error', mensagem: 'Erro: Necessário preencher o campo sobrenome!' });
    if (!cpf) return setStatus({ type: 'error', mensagem: 'Erro: Necessário preencher o campo CPF!' });
    if (!campus_instituicao) return setStatus({ type: 'error', mensagem: 'Erro: Necessário preencher o campo campus/instituição!' });
    if (!titulacao) return setStatus({ type: 'error', mensagem: 'Erro: Necessário preencher o campo titulação!' });
    if (!cargo) return setStatus({ type: 'error', mensagem: 'Erro: Necessário preencher o campo cargo!' });
    if (!telefone) return setStatus({ type: 'error', mensagem: 'Erro: Necessário preencher o campo telefone!' });
    if (!email) return setStatus({ type: 'error', mensagem: 'Erro: Necessário preencher o campo email!' });
    if (!password) return setStatus({ type: 'error', mensagem: 'Erro: Necessário preencher o campo senha!' });
    if (!repeatPass) return setStatus({ type: 'error', mensagem: 'Erro: As senhas precisam ser iguais!' });
    if (!repeatPass) return setStatus({ type: 'error', mensagem: 'Erro: Necessário repetir a senha!' });
    if (repeatPass !== password) return setStatus({ type: 'error', mensagem: 'Erro: As senhas precisam ser iguais!' });
    return true;
  }


  return (
    <Container>
      <ModalConfirm
        showModal={showModal}
        setShowModal={setShowModal}
        message="Organizador cadastrado com sucesso!"
      />
      <Header back="true" />
      <Content>

        <form onSubmit={addUser}>
          <ViewInputs>
            <Input
              label="Nome *"
              type="text"
              value={nome}
              onChange={event => setNome(event.target.value)}
            />

            <Input
              label="Sobrenome *"
              type="text"
              value={sobrenome}
              onChange={event => setSobrenome(event.target.value)}
            />

            <Input
              label="CPF * (apenas números)"
              type="number"
              value={cpf}
              onChange={event => setCpf(event.target.value)}
            />

            <Input
              label="Campus/Instituição *"
              type="text"
              value={campus_instituicao}
              onChange={event => setCampus_instituicao(event.target.value)}
            />

            <Input
              label="Titulação *"
              type="text"
              value={titulacao}
              onChange={event => setTitulacao(event.target.value)}
            />

            <Input
              label="Cargo *"
              type="text"
              value={cargo}
              onChange={event => setCargo(event.target.value)}
            />

            <Input
              label="Telefone *"
              type="text"
              value={telefone}
              onChange={event => setTelefone(event.target.value)}
            />

            <Input
              label="E-mail *"
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />

            <Input
              label="Senha *"
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />

            <Input
              label="Repetir a Senha *"
              type="password"
              value={repeatPass}
              onChange={event => setRepeatPass(event.target.value)}
            />

          </ViewInputs>
          <ViewError>
            {status.type === 'success' ? <p style={{ color: "green" }}>{status.mensagem}</p> : ""}
            {status.type === 'error' ? <p style={{ color: "tomato" }}>{status.mensagem}</p> : ""}
          </ViewError>
          <View>
            <Button name="Cadastrar" type="submit" />
            <P>
              <Link to="/" style={{ textDecoration: "none" }}>
                <p>Voltar ao login</p>
              </Link>
            </P>
          </View>
        </form>
      </Content>
    </Container>

  )
}