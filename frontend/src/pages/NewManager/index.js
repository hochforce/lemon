import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { Input } from '../../components/Form/input';
import { api } from '../../services/api';

export default function NewManager({ history }) {

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');
  const [campus_instituicao, setCampus_instituicao] = useState('');
  const [titulacao, setTitulacao] = useState('');
  const [cargo, setCargo] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formRef = useRef(null);

  async function handleSubmit(data, { reset }, event) {
    event.preventDefault();

    try {
      const schema = Yup.object().shape({
        nome: Yup.string().required('O nome é obrigatório'),
        sobrenome: Yup.string().required('O sobrenome é obrigatório'),
        cpf: Yup.string().required('O CPF é obrigatório'),
        titulacao: Yup.string().required('A titulação é obrigatória'),
        cargo: Yup.string().required('O cargo é obrigatório'),
        campus_instituicao: Yup.string().required('O sobrenome é obrigatório'),
        telefone: Yup.string().required('O telefone é obrigatório'),
        password: Yup.string().required('É necessário criar uma senha')
      })
      await schema.validate(data, {
        abortEarly: false,
      })

      console.log(data);

      //Salvando na tabela contatos
      const saveContact = await api.post('/contatos', {
        telefone,
        email,
      });

      //Pegando o id_contact
      const id_contato = saveContact.data.id;
      console.log(id_contato);
      

      //Salvando na tabela organizadores
      await api.post('/organizadores', {
        id_contato,
        nome,
        sobrenome,
        cpf,
        campus_instituicao,
        titulacao,
        cargo,
        password
      });

      await api.post('/user-auth', {
        cpf,
        password,
        "tipo": "organizador"
      })

      // const { id } = saveManager.data;
      // localStorage.setItem('organizador', id);

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
      <h1>CADASTRO DE NOVO USUÁRIO ORGANIZADOR/DOSCENTE</h1>
      <div className="container">
        <Form ref={formRef} onSubmit={handleSubmit}>
          <label>Organizador</label>
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
          <Input name="titulacao"
            placeholder="Titulação"
            value={titulacao}
            onChange={event => setTitulacao(event.target.value)}
          />
          <Input name="cargo"
            placeholder="Cargo"
            value={cargo}
            onChange={event => setCargo(event.target.value)}
          />
          <Input name="campus_instituicao"
            placeholder="Campus Instituição"
            value={campus_instituicao}
            onChange={event => setCampus_instituicao(event.target.value)}
          />
          <label>Contato</label>
          <Input name="telefone"
            placeholder="Telefone"
            value={telefone}
            onChange={event => setTelefone(event.target.value)}
          />
          <Input name="email"
            placeholder="E-mail"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <Input name="password"
            type= "password"
            placeholder="Senha"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          <button className="btn" type="submit">Cadastrar</button>
        </Form>
      </div>
    </>
  )
}