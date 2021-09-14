import { api } from '../../services/api';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import React from 'react';
import { Button } from '../../components/Button';
import { LoginInput } from '../../components/LoginInput';
import { Background, Container, Content, Title } from './styles';
import img from "./login.svg";

const Login = ({ history }) => {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [validaLogin, setValidaLogin] = useState('');
  let resp;
  
  async function handleSubmit() {
    try {

      resp = await api.post('/auth', { cpf, password })
      localStorage.setItem('USER-ID', resp.data.user.id);
      localStorage.setItem('TOKEN', resp.data.token);

      if (resp.data.user.tipo === "organizador") {
        localStorage.setItem('organizador', resp.data.user.id);
        history.push('/manager');
      } else if (resp.data.user.tipo === "participante") {
        history.replace('/participant');

      }
      else {
        history.push('/');
      }
    } catch (err) {
      setValidaLogin(err);
      alert("CPF ou Senha inválida.")

    }
  }

  return (
    <Container >
      <Background src={img} />
      <Content >
        <Title>LEMON</Title>
        <LoginInput
          title="CPF"
          value={cpf}
          onChange={event => setCpf(event.target.value)}
          type="text"
        />
        <LoginInput
          value={password}
          onChange={event => setPassword(event.target.value)}
          type="password"
        />

        <Button onClick={handleSubmit} />
        <p>
          <Link to="/new-participant">Cadastrar-me</Link>
        </p>

      </Content>
    </Container>
  )
}
export default Login;