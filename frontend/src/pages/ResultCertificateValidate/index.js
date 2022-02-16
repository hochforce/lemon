import React, { useState } from 'react';
import { Header } from "../../components/Header";
import { Container, Content, ViewMessage, Svg } from "./styles";
import { Button } from "../../components/Button";
import { api } from '../../services/api';
import { useEffect } from 'react';
import bad from './bad.svg'
import happy from './happy.svg'
import NewCertificate from '../../components/NewCertificate';

const ResultCertificateValidate = ({ match, history }) => {
  const [event, setEvent] = useState('');
  const [participant, setParticipant] = useState('');
  const [validaUrl, setValidaUrl] = useState(false);
  async function handleGoBack() {
    history.push('/autenticar_documento');
  }
  async function search() {
    const searchParticipant = await api.get(`/searchParticipantById/${match.params.idParticipante}`)
    setParticipant(searchParticipant.data)
    const searchEvent = await api.get(`/listEventos/${match.params.idEvento}`)
    setEvent(searchEvent.data)
  }

  function valida() {
    if (participant.id) {
      console.log(match.params.code)
      setValidaUrl(true) 
    }
  }
  function printCertificate(){
    NewCertificate(
      `${participant.nome} ${participant.sobrenome}`,
      `${event.titulo}`,
      `${event.carga_horaria}`,
      `${event.id_endereco}`,
      `${event.id_periodo_duracao}`,
      `${participant.id}`,
      `${event.id}`,
      `${match.params.code}`
    )
  }
  useEffect(() => {
    valida()
  }, [participant])
  useEffect(() => {
    search()
  }, [])

  
  return (
    <Container>
      <Header />
      <Content>
        <h1>Validação de Certificado</h1>
        {
          validaUrl
            ?
            <ViewMessage>
              <Svg src={happy} />
              <h2>Seu certificado é verdadeiro!</h2>
              <p>Clique no botão abaixo para imprimir uma cópia.</p>
              <Button name="Imprimir" onClick={() => printCertificate()} />
            </ViewMessage>
            :
            <ViewMessage>
              <Svg src={bad} />
              <h2>Ops! Não encontrei seu certificado...</h2>
            </ViewMessage>
        }
        <Button name="Voltar" onClick={() => handleGoBack()} />
        
      </Content>
    </Container>
  )
}
export default ResultCertificateValidate;