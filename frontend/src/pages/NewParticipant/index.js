import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { api } from '../../services/api';
import { Button } from "../../components/Button";
import Input from "../../components/Input";
import { Header } from './../../components/Header/index';
import { Container, Content, P, View, ViewInputs } from "./styles.js";


const NewParticipant = ({ history }) => {

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
    <Container>
      <Header back="true" />
      <Content>
        <ViewInputs>
          <Input
            label="Nome"
            type="text"
            value={nome}
            onChange={event => setNome(event.target.value)}
          />

          <Input
            label="Sobrenome"
            type="text"
            value={sobrenome}
            onChange={event => setSobrenome(event.target.value)}
          />

          <Input
            label="CPF"
            type="text"
            value={cpf}
            onChange={event => setCpf(event.target.value)}
          />

          <Input
            label="Campus/Instituição"
            type="text"
            value={campus_instituicao}
            onChange={event => setCampus_instituicao(event.target.value)}
          />

          <Input
            label="Senha"
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          <Input
            label="Repetir a Senha"
            type="password"
          />

          <View>
            <Button name="Cadastrar" onClick={handleSubmit}/>
            <P>
              <Link to="/" style={{textDecoration: "none"}}>
                <p>Voltar ao login</p>
              </Link>
            </P>
          </View>
        </ViewInputs>
      </Content>
    </Container>
  )
}

export default NewParticipant;