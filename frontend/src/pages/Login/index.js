import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { Alert } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { Input } from '../../components/Form/input';
import { api } from '../../services/api';
import './styles.css';

const Login = ({ history }) => {

  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState();
  const formRef = useRef(null);
  const [form] = useForm();
  const [validaLogin, setValidaLogin] = useState();


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
      let value;
      try {
        const response = await api.post('/auth', { cpf, password });
        value = response;
      } catch (error) {
        setValidaLogin(error);
      }
      localStorage.setItem('USER-ID', value.data.user.id);
      localStorage.setItem('TOKEN', value.data.token);


      formRef.current.setErrors({});
      reset();
      if (value.data.user.tipo === "organizador") {
        localStorage.setItem('organizador', value.data.user.id);
        history.push('/manager');
      } else if (value.data.user.tipo === "participante") {
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
    <div id="login-page">
      <aside>
        
      </aside>
      <main>
        <div className="main-content">
          <Form name="normal_login" className="login-form" form={form} ref={formRef} onSubmit={handleSubmit}>
            <label><strong>LEMON</strong></label>            
            <Input
              className="input"
              name="cpf"
              placeholder="CPF"
              value={cpf}
              onChange={event => setCpf(event.target.value)}
            />

            <Input
              className="input"
              name="password"
              placeholder="Senha"
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            {validaLogin &&
              <Alert message="CPF ou Senha inválida." type="error" showIcon />
            }
            <button className="btn" type="submit">Entrar</button>
            <p>
              <Link to="/new-participant">Cadastrar-me</Link>
            </p>
            
          </Form>
        </div>
      </main>
    </div>
  )
}

export default Login;