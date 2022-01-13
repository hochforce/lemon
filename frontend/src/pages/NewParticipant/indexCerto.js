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
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeatPass] = useState(null);
  const [eventSubmit, setEventSubmit] = useState(false);
  const [cpfIsValid, setCpfIsValid] = useState(true);

  async function handleSubmit(event) {
    event.preventDefault();
    setEventSubmit(true);


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
          setCpfIsValid(true);
          history.push('/participant');
        } catch {
          setCpfIsValid(false);
          //alert("O CPF digitado é inválido ou já está cadastrado.");
        }
      } catch {
        alert("Confira se as informações estão corretas.");
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