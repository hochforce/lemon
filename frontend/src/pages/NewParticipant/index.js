import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { Input } from '../../components/Form/input';
import { api } from '../../services/api';
import './styles.css';
 
export default function NewParticipant({ history }) {

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [campus_instituicao, setCampus_instituicao] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('')

  const formRef = useRef(null);

  async function handleSubmit(data, { reset }, event) {
    event.preventDefault();

    try {
      const schema = Yup.object().shape({
        nome: Yup.string().required('O nome é obrigatório'),
        sobrenome: Yup.string().required('O sobrenome é obrigatório'),
        cpf: Yup.string().required('O CPF é obrigatório'),
        campus_instituicao: Yup.string().required('O Campus é obrigatório'),
        password: Yup.string().required('É necessário criar uma senha'),
      })
      await schema.validate(data, {
        abortEarly: false,
      })

      console.log(data);
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
      
      // const { id } = saveParticipante.data;
      // localStorage.setItem('participante', id);

      //Para pegar uma propriedade do response
      //const { _id } = response.data;

      formRef.current.setErrors({});
      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        })

        formRef.current.setErrors(errorMessages);
      }
    }
    history.push('/dashboard');
  }

  return (
    <>
      <div className="menu-temp">
        <a href="http://localhost:3000/new-participant">Participante</a>
        <a href="http://localhost:3000/new-manager">Organizador</a>
        <a href="http://localhost:3000/new-event">Evento</a>
        <a href="http://localhost:3000/">Login</a>
        <a href="http://localhost:3000/new-certificate">Gerar Certificado</a>
        <a href="http://localhost:3000/manager">Dash Organizador</a>
      </div>
      <h1>CADASTRO DE NOVO USUÁRIO</h1>
      <div className="container">
        <Form ref={formRef} onSubmit={handleSubmit}>
          <label >Usuário</label>
          <Input name="nome"
            placeholder="Nome"
            value={nome}
            onChange={event => setNome(event.target.value)}
          />
          <Input name="sobrenome"
            placeholder="Sobrenome"
            value={sobrenome}
            onChange={event => setSobrenome(event.target.value)}
          />
          <Input name="cpf"
            placeholder="CPF"
            value={cpf}
            onChange={event => setCpf(event.target.value)}
          />
          <Input name="campus_instituicao"
            placeholder="Campus Instituição"
            value={campus_instituicao}
            onChange={event => setCampus_instituicao(event.target.value)}
          />
          <Input name="password"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          <button className="btn" type="submit">Cadastrar</button>
          <Link to="/">Já sou cadastrado</Link>
        </Form>
      </div>
    </>
  )
}