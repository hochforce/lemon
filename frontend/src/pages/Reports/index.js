import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { Header } from '../../components/Header';
import { Container, List, Content } from './styles';
import { Button } from "../../components/Button";
import ReportsComponent from '../../components/Reports';


const Reports = () => {
  const [subscribes, setSubscribes] = useState('');
  const [event, setEvent] = useState('');
  const [redirect, setRedirect] = useState('');
  const [isPresent, setIsPresent] = useState([]);
  const [participant, setParticipant] = useState([]);
  const [subscribe, setSubscribe] = useState('');
  const param = useParams();
  
  async function search() {
    const subscribes = await api.get(`/searchSubscribeByEvent/${param.id}`)
    setSubscribe(subscribes.data)
    const participants = await api.get('/listParticipantes')
    setParticipant(participants.data)
    const evento = await api.get(`/listEventos/${param.id}`)
    setEvent(evento.data)
  }

  function searchParticipants() {
    let namesIdParticipant = []
    let i = 0;
    participant.map((e) => {
      
      if (subscribe.find((f) => f.id_participante === e.id)) {
        
        namesIdParticipant.push({
          name: e.nome + " " + e.sobrenome,
          id: e.id,
          present: subscribe.lenth > 0 ? subscribe[i].is_present : true 
        })
      }
      i++;
    })
    setSubscribes(namesIdParticipant);
  }
  useEffect(() => {
    search()
  }, [])
  useEffect(() => {
    searchParticipants()
  }, [participant])

  function handleGoBack() {
    setRedirect('/manager');
  }

  function handleLogOut() {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('organizador');
    localStorage.removeItem('USER-ID');
    setRedirect('/');
  }

  function handleUserInfo() {
    setRedirect(`/manager-info/${localStorage.getItem('USER-ID')}`);
  }
  
  return (
    <Container>
      <Header
        basic="true"
        back="true"
        user="manager"
        userLogged="Organizador"
        nameItem="Eventos"
        onClickLogout={() => handleLogOut()}
        onClickUsr={() => handleUserInfo()}
        goBack={() => handleGoBack()}
      />
      <Content>

      <h1>Lista de Participantes</h1>
      <p>{event.titulo}</p>
      {Array.isArray(subscribes) && subscribes.map((sub) =>
              <>

                <List present={sub.present}><p>{sub.name}</p><p>{!sub.present ? "Ausente" : "Presente"}</p></List>
                
              </>
            )}
      <Button name="Imprimir" onClick={()=>
        window.print()
        }/>
        </Content>
      
      {redirect && <Redirect to={{ pathname: redirect }} />}
    </Container>
  )
}
export default Reports;