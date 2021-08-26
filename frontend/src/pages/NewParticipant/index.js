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
      try {
        await api.post('/user-auth', {
          cpf,
          password,
          "tipo": "participante"
        })
        history.push('/participant');
      } catch {
        alert("CPF inválido!");
      }
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

  }

  return (
    <>
      <div className="header-cadastro">
        <div className="logo-cadastro" >
          <a href="/">LEMON</a>
        </div>
        <div className="titulo-cadastro">
          <h1>Cadastro de Participante</h1>
        </div>
      </div>

      <div className="content-cadastro">
        <Form ref={formRef} onSubmit={handleSubmit}>
          
              <label >Nome</label>
              <Input name="nome"
                placeholder="Nome"
                value={nome}
                onChange={event => setNome(event.target.value)}
              />
            
              <label className="tro">Sobrenome</label>
              <Input name="sobrenome"
                placeholder="Sobrenome"
                value={sobrenome}
                onChange={event => setSobrenome(event.target.value)}
              />
           
          
              <label>CPF (Somente Números)</label>
              <Input name="cpf"
                placeholder="CPF"
                value={cpf}
                onChange={event => setCpf(event.target.value)}
              />
            
           
              <label>Campus/Instituição</label>
              <Input name="campus_instituicao"
                placeholder="Campus Instituição"
                value={campus_instituicao}
                onChange={event => setCampus_instituicao(event.target.value)}
              />
           
              <label>Senha</label>
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