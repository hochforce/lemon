// import { Form, Input, Button, Alert } from 'antd';
import { api } from '../../services/api';
import { useState } from 'react';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './styles.css';
import fundo from '../../../src/assets/images/fundo-login.png'

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
    <div className="content-externo">
      <img className="fundo" src={fundo} alt="Imagem de Fundo" />
      <div className="content-login">
        <label className="logo-login">LEMON</label>
        <div className="form-login">
          <label>CPF</label>
          <input
            value={cpf}
            onChange={event => setCpf(event.target.value)}
            type="text"
          />

          <label>Senha</label>
          <input
            value={password}
            onChange={event => setPassword(event.target.value)}
            type="password" />

          <button onClick={handleSubmit}>Entrar</button>
        </div>
      </div>
    </div>
  )
}

export default Login