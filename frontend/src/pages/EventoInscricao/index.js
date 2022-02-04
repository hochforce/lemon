import { useState, useEffect } from 'react';
import { api } from '../../services/api.js';
import { Container, Content, Title, SubTitle, DateTimeAddress, SubMessage } from './styles.js';
import { Header } from './../../components/Header/index';
import { Breadcrumb } from '../../components/Breadcrumb/index.js';
import { Button } from '../../components/Button';
import { ModalConfirm } from './../../components/ModalConfirm/index';

const EventInscricao = ({ match, history }) => {




  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(prev => !prev)
  }

  const [redirect, setRedirect] = useState('');
  const [evento, setEvento] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [endereco, setEndereco] = useState('');
  const [sub, setSub] = useState(false);
  const userId = localStorage.getItem("USER-ID");
  const [participante, setParticipante] = useState('');
  const [progressEvent, setProgressEvent] = useState(false);

  async function search() {

    const buscaEventos = await api.get(`/listEventos/${match?.params?.id}`);
    setEvento(buscaEventos.data);

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



  const callPeriodos = async () => {
    const buscaPeriodos = await api.get(`/listPeriodos/${evento.id_periodo_duracao}`);
    setPeriodo(buscaPeriodos.data);
  }

  const callEnderecos = async () => {
    const buscaEnderecos = await api.get(`/listEnderecos/${evento.id_endereco}`);
    setEndereco(buscaEnderecos.data);
    const subscription = await api.get(`/subscribe/${participante.id}/${evento.id}`)
    setSub(subscription.data)
  }

  useEffect(() => {
    (() => {
      callPeriodos()
      callEnderecos()
    })()
  }, [evento, participante])

  async function handleSubscribe() {
    setProgressEvent(true);





    try {
      await api.post('/inscricoes', {
        id_evento: evento.id,
        id_participante: participante.id
      });
      openModal();

    } catch {

    }
    setProgressEvent(false);
    setTimeout(function () {
      history.push('/participant');
    }, 2000)
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
      <ModalConfirm
        showModal={showModal}
        setShowModal={setShowModal}
        message="Inscrição realizada com sucesso!"
      />
      <Header
        user="participant"
        userLogged="Participante"
        nameItem="Eventos"
        onClickLogout={() => handleLogOut()}
        onClickUsr={() => handleUserInfo()}
        back="true"
        goBack={() => handleGoBack()}
      />
      <Breadcrumb name=" > Confirmação de inscrição" />
      <Content>
        <Title>{evento.titulo}</Title>
        <SubTitle>{evento.descricao}</SubTitle>
        <DateTimeAddress>
          <strong>Início:</strong> {periodo.data_inicio} às {periodo.hora_inicio} horas <br />
          <strong>Término:</strong> {periodo.data_fim} às {periodo.hora_fim} horas
        </DateTimeAddress>
        <DateTimeAddress>
          {endereco.logradouro}, {endereco.numero} <br />
          {endereco.bairro}, {endereco.cidade}, {endereco.estado}
        </DateTimeAddress>

        <SubMessage>{sub === true ? "Você já se inscreveu nesse evento." : null}</SubMessage>
        <Button name={sub === true ? "Inscrito" : "Confirmar"} onClick={() => sub === true ? {} : handleSubscribe()} haveSub={sub} />
      </Content>
    </Container>
  )

}

export default EventInscricao;