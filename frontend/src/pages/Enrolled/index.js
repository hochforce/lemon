import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Header } from "../../components/Header";
import { Container, Content, List } from "./styles";
import { api } from '../../services/api';
import { useEffect } from 'react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Checkbox, Divider, Switch } from 'antd';

const Enrolled = ({ match, history }) => {

  const [redirect, setRedirect] = useState('');
  const [checkedList, setCheckedList] = useState();
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [participant, setParticipant] = useState([]);
  const [subscribe, setSubscribe] = useState('');
  const [isPresent, setIsPresent] = useState([]);
  let idEvent = match.params.id;

  async function search() {
    const subscribes = await api.get(`/searchSubscribeByEvent/${idEvent}`)
    setSubscribe(subscribes.data)
    const participants = await api.get('/listParticipantes')
    setParticipant(participants.data)
  }


  function searchParticipants() {
    let namesIdParticipant = []
    participant.map((e) => {
      if (subscribe.find((f) => f.id_participante === e.id)) {
        namesIdParticipant.push({
          name: e.nome + " " + e.sobrenome,
          id: e.id,
          present: false
        })
      }
    })
    setIsPresent(namesIdParticipant);
  }

  useEffect(() => {
    search()
  }, [])
  useEffect(() => {
    searchParticipants()
  }, [participant])
 
  function handleLogOut() {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('organizador');
    localStorage.removeItem('USER-ID');
    setRedirect('/');
  }

  function handleUserInfo() {
    setRedirect(`/manager-info/${localStorage.getItem('USER-ID')}`);
  }
  function handleGoBack() {
    history.push(`/event-options/${match.params.id}`);
  }
  console.log(isPresent)
  const onChange = id => {
    
    setIsPresent(
      isPresent.map(item => {
        return item.id === id 
        ? {...item, present : !item.present}
        : {...item}
      })
    )
    };
 
  const onCheckAllChange = e => {
    if(!checkAll){
      setIsPresent(
        isPresent.map(item => {
          return {...item, present : true}
        })
      )
    } else {
      setIsPresent(
        isPresent.map(item => {
          return {...item, present : false}
        })
      )
    }
    setCheckAll( !checkAll )
  };

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
      <Breadcrumb name=" > Informações do evento > Lista de inscritos" />
      <Content>

        <List>
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Selecionar todos
          </Checkbox>
          <Divider />
          {/* <CheckboxGroup
            className='checkBoxGroup'
            options={isPresent}
            value={checkedList}
            onChange={onChange}
            
          /> */}
          {isPresent.map((item, index) => (
            <>
              <Checkbox
                checked={item.present}
                onChange={() => onChange(item.id)}
              >
                {item.name}
              </Checkbox>
              
            </>
          ))}

        </List>
      </Content>
      {redirect && <Redirect to={{ pathname: redirect }} />}
    </Container>
  )
}

export default Enrolled;