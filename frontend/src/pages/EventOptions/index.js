import { useState, useEffect } from 'react';
import { api } from '../../services/api.js';
import { Container, Content, Title, SubTitle, DateTimeAddress, SubMessage, Online, AlignButtons } from './styles.js';
import { Header } from './../../components/Header/index';
import { Breadcrumb } from '../../components/Breadcrumb/index.js';
import { Button } from '../../components/Button';
import { ModalConfirm } from './../../components/ModalConfirm/index';
import { Redirect } from 'react-router-dom';

const EventOptions = ({ match, history }) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(prev => !prev)
  }
  const [messageModal, setMessageModal] = useState('');
  const [redirect, setRedirect] = useState('');
  const [evento, setEvento] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [endereco, setEndereco] = useState('');
  const [sub, setSub] = useState(false);
  const userId = localStorage.getItem("USER-ID");
  const [participante, setParticipante] = useState('');

  async function search() {

    const buscaEventos = await api.get(`/listEventos/${match?.params?.id}`);
    setEvento(buscaEventos.data);
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
  }, [evento])

  
  function handleLogOut() {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('organizador');
    localStorage.removeItem('USER-ID');
    history.push('/');
  }

  function handleUserInfo() {
    setRedirect(`/manager-info/${localStorage.getItem('USER-ID')}`);
  }

  function handleGoBack() {
    history.push('/manager');
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
  async function handleCancelEvent(e) {
    setMessageModal("Evento cancelado com sucesso!")
    await api.post(`/updateStatus/${e}`, {
      status: 'cancelado'
    })
    openModal();
    setTimeout(function () {
      history.push('/manager');
    }, 2000)
  }
  async function handleCloseEvent(e) {
    setMessageModal("Evento encerrado com sucesso!")
    await api.post(`/updateStatus/${e}`, {
      status: 'finalizado'
    })
    openModal();
    setTimeout(function () {
      history.push('/manager');
    }, 2000)
  }

  return (
    <Container>
      <ModalConfirm
        showModal={showModal}
        setShowModal={setShowModal}
        message={messageModal}
      />
      <Header
        basic="true"
        user="manager"
        userLogged="Organizador"
        nameItem="Eventos"
        onClickLogout={() => handleLogOut()}
        onClickUsr={() => handleUserInfo()}
        back="true"
        goBack={() => handleGoBack()}
      />
      <Breadcrumb name=" > Informações do evento" />
      <Content>
        <Title>{evento.titulo}</Title>

        <SubTitle>{evento.descricao}</SubTitle>
        <DateTimeAddress>
          <strong>Início:</strong> {inicialDate().getDate()} de {month(inicialDate())} de {inicialDate().getFullYear()} às {inicialDate().getHours()}h{inicialDate().getMinutes()}min <br />
          <strong>Término:</strong> {finalDate().getDate()} de {month(finalDate())} de {finalDate().getFullYear()} às {finalDate().getHours()}h{finalDate().getMinutes()}min
        </DateTimeAddress>
        {
          !evento.is_online ?

            <DateTimeAddress>
              {endereco.logradouro}, {endereco.numero} <br />
              {endereco.bairro}, {endereco.cidade}, {endereco.estado}
            </DateTimeAddress>
            :
            <Online>Este é um evento online</Online>
        }
        <AlignButtons>
          <Button name="Editar" onClick={() => { setRedirect(`/evento-info/${evento.id}`) }} />
          <Button name="Encerrar" onClick={() => handleCloseEvent(evento.id)} />
          <Button name="Cancelar" onClick={() => handleCancelEvent(evento.id)} />
          <Button name="Inscritos" onClick={() => {setRedirect(`/enrolled/${evento.id}`)}} />
        </AlignButtons>
      </Content>
      {redirect && <Redirect to={{ pathname: redirect }} />}
    </Container>
  )

}

export default EventOptions;