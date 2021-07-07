import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { Input } from '../../components/Form/input';
import { api } from '../../services/api';
import './styles.css';

export default function Login({ history }) {

  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }, event) {
    event.preventDefault();

    try {
      const schema = Yup.object().shape({
        cpf: Yup.string().required('CPF é Obrigatório'),
        password: Yup.string().required('Senha é Obrigatório')
      })
      await schema.validate(data, {
        abortEarly: false,
      })
      const saveLogin = await api.post('/auth', { cpf, password });
      console.log("ID ORG > ", saveLogin.data.user.id);
      localStorage.setItem('TOKEN', saveLogin.data.token);
      localStorage.setItem('USER-ID', saveLogin.data.user.id);

      formRef.current.setErrors({});
      reset();
      if (saveLogin.data.user.tipo === "organizador") {
        history.push('/manager');
      } else if (saveLogin.data.user.tipo === "participante") {
        history.push('/participant');
      }
      else {
        history.push('/');
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {};
        error.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        })
        formRef.current.setErrors(errorMessages);
      }
    }

  }

  return (
    <>
      {/* <div className="menu-temp">
        <a href="http://localhost:3000/new-participant">Participante</a>
        <a href="http://localhost:3000/new-manager">Organizador</a>
        <a href="http://localhost:3000/new-event">Evento</a>
        <a href="http://localhost:3000/">Login</a>
        <a href="http://localhost:3000/new-certificate">Gerar Certificado</a>
        <a href="http://localhost:3000/manager">Dash Organizador</a>
      </div> */}
      <div className="container">
        <Form ref={formRef} onSubmit={handleSubmit}>
          <label>Entrar em Lemon</label>
          <Input
            name="cpf"
            placeholder="CPF"
            value={cpf}
            onChange={event => setCpf(event.target.value)}
          />
          <Input
            name="password"
            placeholder="Senha"
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <button className="btn" type="submit">Entrar</button>
          <p>
            <Link to="/new-participant">Cadastrar-me</Link>
          </p>
        </Form>
      </div>
    </>
  )
}