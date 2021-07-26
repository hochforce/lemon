import { Form, Input, Button, Alert } from 'antd';
import { api } from '../../services/api';
import { useState } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

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
        history.push('/participant');
      }
      else {
        history.push('/');
      }
    } catch (err) {
      setValidaLogin(err);
    }
  }

  return (

    <Form
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 5 }}
      onFinish={handleSubmit}
    >
      <Form.Item
        label="CPF"
        name="username"
        value={cpf}
        onChange={event => setCpf(event.target.value)}
        rules={[{ required: true, message: 'Seu CPF é necessário!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Digite seu CPF"/>
      </Form.Item>

      <Form.Item
        label="Senha"
        name="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
        rules={[{ required: true, message: 'Sua senha é necessária!' }]}
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Digite sua senha"/>
      </Form.Item>

      <Form.Item
        wrapperCol={{ offset: 8, span: 5 }}
      >
        {validaLogin &&
          <Alert

            message="CPF ou Senha inválida."
            type="error"
            showIcon
          />
        }
      </Form.Item>

      <Form.Item
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Button type="primary" htmlType="submit">
          Entrar
        </Button>
      </Form.Item>
    </Form>

  )
}

export default Login