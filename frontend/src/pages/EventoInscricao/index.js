import { useState, useEffect } from 'react';
import { api } from '../../services/api.js';
import { Container, Content, Title, SubTitle, DateTimeAddress, SubMessage, Online } from './styles.js';
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
    history.push('/');
  }

  function handleUserInfo() {
    history.push(`/user-info/${participante.id}`);
  }

  function handleGoBack() {
    history.push('/participant');
  }

  function finalDate() {
    const today = new Date(periodo.fim);
    return today
  }
  function inicialDate() {
    const today = new Date(periodo.inicio);
    return today
  }

  function month(date) {
    const data = new Date(date);
    const month = data.getMonth();

    if (month === 0) return 'janeiro'
    if (month === 1) return 'fevereiro'
    if (month === 2) return 'março'
    if (month === 3) return 'abril'
    if (month === 4) return 'maio'
    if (month === 5) return 'junho'
    if (month === 6) return 'julho'
    if (month === 7) return 'agosto'
    if (month === 8) return 'setembro'
    if (month === 9) return 'outubro'
    if (month === 10) return 'novembro'
    if (month === 11) return 'dezembro'
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
          <strong>Início:</strong> {inicialDate().getDate()} de {month(inicialDate())} de {inicialDate().getFullYear()} às {inicialDate().getHours()}h{inicialDate().getMinutes()}min <br />
          <strong>Término:</strong> {finalDate().getDate()} de {month(finalDate())} de {finalDate().getFullYear()} às {finalDate().getHours()}h{finalDate().getMinutes()}min
        </DateTimeAddress>
        {
          endereco.logradouro ?

            <DateTimeAddress>
              {endereco.logradouro}, {endereco.numero} <br />
              {endereco.bairro}, {endereco.cidade}, {endereco.estado}
            </DateTimeAddress>
            :
            <Online>Este é um evento online</Online>
        }

        <SubMessage>{sub === true ? "Você já se inscreveu nesse evento." : null}</SubMessage>
        <Button name={sub === true ? "Inscrito" : "Confirmar"} onClick={() => sub === true ? {} : handleSubscribe()} haveSub={sub} />
      </Content>
    </Container>
  )

}

export default EventInscricao;