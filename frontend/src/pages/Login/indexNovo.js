import { useState, useRef } from 'react';
import { api } from '../../services/api';
import { Form, Input, Button, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './styles.css';

const Login = ({ history }) => {
  const [validaLogin, setValidaLogin] = useState();
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const formRef = useRef(null);
  let value;

  async function handleLogin() {

    try {
      const response = await api.post('/auth', { cpf, password });
      value = response;
    } catch (error) {
      setValidaLogin(error);
    }
    localStorage.setItem('USER-ID', value.data.user.id);
    localStorage.setItem('TOKEN', value.data.token);
    
    
    

    if (value.data.user.tipo === "organizador") {
      localStorage.setItem('organizador', value.data.user.id);
      history.push('/manager');
    } else if (value.data.user.tipo === "participante") {
      history.push('/participant');
    }
    else {
      history.push('/');
    }
  }
  return (
    <div className="content">

      <Form
        name="normal_login"
        className="login-form"
        onFinish={handleLogin}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Digite seu CPF',
            },
          ]}
        >
          <Input 
            prefix={<UserOutlined className="site-form-item-icon" />} 
            placeholder="CPF" 
            value={cpf}
            onChange={event => setCpf(event.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Digite sua senha',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Senha"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </Form.Item>
        <Form.Item>
          {validaLogin &&
            <Alert message="CPF ou Senha inválida." type="error" showIcon />
          }
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;