import { api } from '../../services/api';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import React from 'react';
import { Button } from '../../components/Button';
import { LoginInput } from '../../components/LoginInput';
import { Background, Container, Content, Title, View, Svg, ViewError } from './styles';
import img from "../../assets/images/login.svg";
import usr from '../../assets/images/user.svg';
import psw from '../../assets/images/psw.svg';

const Login = ({ history }) => {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  });
  let resp;

  async function handleSubmit(e) {
    e.preventDefault();

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
      setCpf('')
      setPassword('');
      return setStatus({ type: 'error', mensagem: 'Erro: Dados inválidos!' });
    }
  }

  return (
    <Container >
      <Background src={img} />
      <Content >
        <Title>LEMON</Title>
        <form onSubmit={handleSubmit}>
          <LoginInput
            name="CPF"
            value={cpf}
            onChange={event => setCpf(event.target.value)}
            type="text"
            placeholder="CPF"
            icon={<Svg src={usr} />}
          />
          <LoginInput
            value={password}
            onChange={event => setPassword(event.target.value)}
            type="password"
            name="password"
            placeholder="Senha"
            icon={<Svg src={psw} />}
          />
          <ViewError>
            {status.type === 'error' ? <p style={{ color: "tomato" }}>{status.mensagem}</p> : ""}
          </ViewError>
          <Button name="Entrar" type="submit" loginButton />
          <View>
            <Link to="/new-participant" style={{ textDecoration: "none" }}>
              <p>Cadastrar-me</p>
            </Link>
           
          </View>
        </form>

      </Content>
    </Container>
  )
}
export default Login;