import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Header } from "../../components/Header";
import { Container, Content, List } from "./styles";
import { api } from '../../services/api';
import { useEffect } from 'react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Checkbox, Divider } from 'antd';
import { Button } from '../../components/Button';
import { ModalConfirm } from '../../components/ModalConfirm';


const Enrolled = ({ match, history }) => {

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {

    setShowModal(prev => !prev)
  }

  const [redirect, setRedirect] = useState('');
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

  const onChange = id => {

    setIsPresent(
      isPresent.map(item => {
        return item.id === id
          ? { ...item, present: !item.present }
          : { ...item }
      })
    )
  };

  const onCheckAllChange = e => {
    if (!checkAll) {
      setIsPresent(
        isPresent.map(item => {
          return { ...item, present: true }
        })
      )
    } else {
      setIsPresent(
        isPresent.map(item => {
          return { ...item, present: false }
        })
      )
    }
    setCheckAll(!checkAll)
  };

  async function handleSend() {
    isPresent.map((e) => {
      api.post(`/updateIscricoes`, {
        id_participante: e.id,
        is_present: e.present
      })
    })
    openModal();
    setTimeout(function () {
      return
    }, 3000)
  }

  return (
    <Container>
      <ModalConfirm
        showModal={showModal}
        setShowModal={setShowModal}
        message="Dados salvos com sucesso!"
      />
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
            style={{ borderBottom: "solid" }}
          >
            Selecionar todos
          </Checkbox>
          <Divider />

          {isPresent.map((item, index) => (
            <>
              <Checkbox
                checked={item.present}
                onChange={() => onChange(item.id)}
                style={{ marginTop: "10px" }}
              >
                {item.name}
              </Checkbox>

            </>
          ))}

        </List>
        <Button name="Confirmar" onClick={() => handleSend()} />
      </Content>
      {redirect && <Redirect to={{ pathname: redirect }} />}
    </Container>
  )
}

export default Enrolled;