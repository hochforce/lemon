import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Button } from "../../components/Button";
import Input from "../../components/Input";
import { Header } from './../../components/Header/index';
import { Container, Content, P, View, ViewInputs, ViewError } from "./styles.js";
import { validaCpf } from '../../components/CPFValidate';

const NewParticipant = ({ history }) => {
  
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [campus_instituicao, setCampus_instituicao] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeatPass] = useState(null);
  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  });

  async function addUser(e) {
    e.preventDefault();
    let saveDataForm = false;



    if (validate()) {
      if (!validaCpf(cpf)) {
        return setStatus({ type: 'error', mensagem: 'Erro: Insira um CPF válido. (Digite somente os números)!' });
      } else {
        try {
          await api.post('/participantes', {
            nome,
            sobrenome,
            cpf,
            campus_instituicao,
            password
          });

          await api.post('/user-auth', {
            cpf,
            password,
            "tipo": "participante"
          })

          history.push('/participant');

        } catch {
          return setStatus({ type: 'error', mensagem: 'Erro: Este CPF já está cadastrado, volte para a tela de login.' });
        }
        saveDataForm = true;
      }
    } else {
      return;
    };



    if (saveDataForm) {
      setStatus({
        type: 'success',
        mensagem: "Usuário cadastrado com sucesso!"
      });

    } else {
      setStatus({
        type: 'error',
        mensagem: "Erro: Usuário não cadastrado com sucesso!"
      });
    }
  }

  function validate() {
    if (!nome) return setStatus({ type: 'error', mensagem: 'Erro: Necessário preencher o campo nome!' });
    if (!sobrenome) return setStatus({ type: 'error', mensagem: 'Erro: Necessário preencher o campo Sobrenome!' });
    if (!cpf) return setStatus({ type: 'error', mensagem: 'Erro: Necessário preencher o campo CPF!' });
    if (!campus_instituicao) return setStatus({ type: 'error', mensagem: 'Erro: Necessário preencher o campo Campus/Instituição!' });
    if (!password) return setStatus({ type: 'error', mensagem: 'Erro: Necessário preencher o campo Senha!' }); if (!repeatPass) return setStatus({ type: 'error', mensagem: 'Erro: As senhas precisam ser iguais!' });
    if (!repeatPass) return setStatus({ type: 'error', mensagem: 'Erro: Necessário repetir a senha!' });
    if (repeatPass !== password) return setStatus({ type: 'error', mensagem: 'Erro: As senhas precisam ser iguais!' });
    return true;
  }


  return (
    <Container>
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
              type="text"
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
  );
}

export default NewParticipant;
