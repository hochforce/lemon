import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Header } from "../../components/Header";
import { Container, Content, List } from "./styles";
import { api } from '../../services/api';
import { useEffect } from 'react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Checkbox, Divider, Switch } from 'antd';

const CheckboxGroup = Checkbox.Group;



const Enrolled = ({ match, history }) => {

  const [redirect, setRedirect] = useState('');
  const [checkedList, setCheckedList] = useState();
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [participant, setParticipant] = useState([]);
  let idEvent = match.params.id;
  const plainOptions = ['João Pedro','Maria José','Gabriel Henrique','Pedro Jonas'];
  

  async function search() {

    api.get(`/searchSubscribeByEvent/${idEvent}`).then((u) => {
      u.data.map((t) => {
        api.get(`/searchParticipantById/${t.id_participante}`).then((e) => {
            setParticipant(e.data)
          })
        })
        
    })
  }
  console.log(participant)

  useEffect(() => {
    search()
  }, [])

  // var arr = participant.map(function (obj) {
  //   return Object.keys(obj).map(function (key) {
  //     return obj[key];
  //   });
  // });
  // console.log(arr);

  // for(const key in participant){
  //   qualquer.push(participant[key])
  // }




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

  const onChange = list => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
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
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            Selecionar todos
          </Checkbox>
          <Divider />
          <CheckboxGroup className='checkBoxGroup' options={plainOptions} value={checkedList} onChange={onChange} />

        </List>
      </Content>
      {redirect && <Redirect to={{ pathname: redirect }} />}
    </Container>
  )
}

export default Enrolled;