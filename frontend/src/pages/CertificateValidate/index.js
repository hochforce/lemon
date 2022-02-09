import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Header } from "../../components/Header";
import { Container, Content, ViewError } from "./styles";
import { Button } from "../../components/Button";
import  Input  from "../../components/Input";
import { api } from '../../services/api';

const CertificateValidate = ({ history }) => {

  const [redirect, setRedirect] = useState('');
  const [validationCode, setValidationCode] = useState('');
  const [ validationData, setValidationData ] = useState('');
  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  });

  async function handleValidation() {
    if(formValidate()){
      const validation = await api.get(`/validation/${validationCode}`)
      setValidationData(validation.data);
      history.push(`/resultado/${validation.data.id_evento}/${validation.data.id_participante}/${validationCode}`);
    } else {
      return;
    }
  }
  function formValidate() {
    if (!validationCode) return setStatus({ type: 'error', mensagem: 'É Necessário preencher o campo com o código presente no rodapé do certificado!' });
    return true;
  }
  
  return (
    <Container>
      <Header />
      <Content>
        <h1>Validação de Certificado</h1>
        
        <Input
        label="Digite o código de validação"
        type="text"
        value={validationCode}
        onChange={e =>setValidationCode(e.target.value)}
        />
        <ViewError>
            {status.type === 'error' ? <p style={{ color: "tomato" }}>{status.mensagem}</p> : ""}
          </ViewError>
        <Button name="Validar" onClick={()=>handleValidation()}/>

      </Content>
      {redirect && <Redirect to={{ pathname: redirect }} />}
    </Container>
  )
}

export default CertificateValidate;