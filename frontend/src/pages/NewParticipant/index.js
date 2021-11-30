import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Button } from "../../components/Button";
import Input from "../../components/Input";
import { Header } from './../../components/Header/index';
import { Container, Content, P, View, ViewInputs } from "./styles.js";


const NewParticipant = ({ history }) => {

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [campus_instituicao, setCampus_instituicao] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('')
  const [repeatPass, setRepeatPass] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault();


    if (nome === '' ||
      sobrenome === '' ||
      campus_instituicao === '' ||
      cpf === '' ||
      password === '') {
      alert("Preencha todos os campos antes de continuar.")

    } else {
      if (password !== repeatPass) {
        alert("As senhas digitadas não são iguais.")
      } else {
        try {
          await api.post('/participantes', {
            nome,
            sobrenome,
            cpf,
            campus_instituicao,
            password
          });
          try {
            await api.post('/user-auth', {
              cpf,
              password,
              "tipo": "participante"
            })
            history.push('/participant');
          } catch {
            alert("O CPF digitado é inválido ou já está cadastrado.");
          }
        } catch {
          alert("Confira se as informações estão corretas.");
        }
      }
    }

  }

  return (
    <Container>
      <Header back="true" />
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

          />

          <Input
            label="Campus/Instituição"
            type="text"
            value={campus_instituicao}
            onChange={event => setCampus_instituicao(event.target.value)}

          />

          <Input
            label="Senha"
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
            <Button name="Cadastrar" onClick={handleSubmit} />
            <P>
              <Link to="/" style={{ textDecoration: "none" }}>
                <p>Voltar ao login</p>
              </Link>
            </P>
          </View>


        </ViewInputs>
      </Content>
    </Container>
  )
}

export default NewParticipant;