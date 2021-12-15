import { useState, useEffect } from 'react';
import { api } from '../../services/api.js';
import { Container, Content, Title, SubTitle, DateTimeAddress } from './styles.js';
import { Header } from './../../components/Header/index';
import { Breadcrumb } from '../../components/Breadcrumb/index.js';
import { Button } from '../../components/Button';

const EventInscricao = ({ match, history }) => {
  const [redirect, setRedirect] = useState('');
  const [evento, setEvento] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [endereco, setEndereco] = useState('');
  const userId = localStorage.getItem("USER-ID");
  const token = localStorage.getItem("TOKEN");
  const [participante, setParticipante] = useState('');
  const [progressEvent, setProgressEvent] = useState(false);
  const [validate, setValidate] = useState({
    event: undefined,
    time: undefined,
    address: undefined,
    together: undefined,
    necessary: undefined,
    scholarship: undefined
  });

  async function search() {
    const buscaCPF = await api.get(`/searchCpf/${userId}`);
    const cpf = buscaCPF.data.cpf;

    const buscaParticipante = await api.get(`/searchParticipant/${cpf}`);
    setParticipante(buscaParticipante.data);

  }

  useEffect(() => {
    (async function () {
      search()
    })()
  }, [])

  const callEventos = async () => {
    const buscaEventos = await api.get(`/listEventos/${match.params.id}`);
    setEvento(buscaEventos.data);
  };

  const callPeriodos = async () => {
    const buscaPeriodos = await api.get(`/listPeriodos/${evento.id_periodo_duracao}`);
    setPeriodo(buscaPeriodos.data);
  }

  const callEnderecos = async () => {
    const buscaEnderecos = await api.get(`/listEnderecos/${evento.id_endereco}`);
    setEndereco(buscaEnderecos.data);
  }

  useEffect(() => {
    (() => {
      callEventos()
    })()
  }, [])

  useEffect(() => {
    (() => {
      callPeriodos()
      callEnderecos()
    })()
  }, [evento])

  async function handleSubscribe() {
    setProgressEvent(true);
    try{
      await api.post('/inscricoes', {
        id_evento: evento.id,
        id_participante: participante.id
      });
    }catch{

    }
    setProgressEvent(false);
    setRedirect('/participant');
  }

  function handleLogOut() {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('organizador');
    localStorage.removeItem('USER-ID');
    setRedirect('/');
  }

  function handleUserInfo() {
    console.log("Exibir user info")
  }

  function handleGoBack() {
    history.push('/participant');
  }
  return (
    <Container>
      <Header
        user="participant"
        userLogged="Participante"
        nameItem="Eventos"
        onClickLogout={() => handleLogOut()}
        onClickUsr={() => handleUserInfo()}
        back="true"
        goBack={() => handleGoBack()}
      />
      <Breadcrumb name=" > Confirmação de inscrição"/>
      <Content>
        <Title>{evento.titulo}</Title>
        <SubTitle>{evento.descricao}</SubTitle>
        <DateTimeAddress>
        <strong>Início:</strong> {periodo.data_inicio} às {periodo.hora_inicio} horas <br/>
        <strong>Término:</strong> {periodo.data_fim} às {periodo.hora_fim} horas
        </DateTimeAddress>
        <DateTimeAddress>
        {endereco.logradouro}, {endereco.numero} <br/>
        {endereco.bairro}, {endereco.cidade}, {endereco.estado}
        </DateTimeAddress>

        <Button name="Confirmar" onClick={handleSubscribe}/>
      </Content>
    </Container>
  )

}

export default EventInscricao;