import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { Container, Content, ViewButton, ViewInputs, ViewRadioButtons, ViewOptions, ViewHeader, ViewTime, ViewAddress, Select, LabelSelect, ViewSelect, ViewError } from "./styles"
import { Header } from './../../components/Header/index';
import Input from './../../components/Input/index';
import { Button } from "../../components/Button";
import { Breadcrumb } from './../../components/Breadcrumb/index';
import { ModalConfirm } from './../../components/ModalConfirm/index';

const EventoInfo = ({ history }) => {

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {

    setShowModal(prev => !prev)
  }
  const [redirect, setRedirect] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState('');
  const [carga_horaria, setCargaHoraria] = useState('');
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  const [status, setStatus] = useState('ativo');
  const [is_online, setOnline] = useState(true);
  const [progressEvent, setProgressEvent] = useState(false);
  const { id } = useParams()
  const [validateForm, setValidateForm] = useState({
    type: '',
    mensagem: ''
  });
  const [validate, setValidate] = useState({
    event: undefined,
    time: undefined,
    address: undefined,
    together: undefined,
    necessary: undefined,
    scholarship: undefined
  });

  async function search() {
    const searchEvent = await api.get(`/listEventos/${id}`);
    setTitulo(searchEvent.data.titulo);
    setDescricao(searchEvent.data.descricao);
    setTipo(searchEvent.data.tipo);
    setCargaHoraria(searchEvent.data.carga_horaria);

    const dateTime = await api.get(`/listPeriodos/${searchEvent.data.id_periodo_duracao}`)
    setInicio(dateTime.data.inicio);
    setFim(dateTime.data.fim);

    const address = await api.get(`/listEnderecos/${searchEvent.data.id_endereco}`)
    setLogradouro(address.data.logradouro);
    setNumero(address.data.numero);
    setComplemento(address.data.complemento);
    setBairro(address.data.bairro);
    setCidade(address.data.cidade);
    setEstado(address.data.estado);
    setCep(address.data.cep);
    
  };
  useEffect(() => {
    if (id) {
      search()
    }
  }, [])

  async function handleSaveEvent(e) {
    e.preventDefault();
    console.log("LOGr: "+logradouro)
    if (isOnline === undefined || isOnline === true) {
      setLogradouro("Rodovia MG 202")
      setNumero(407)
      setComplemento("Km 407")
      setBairro("Zona Rural")
      setCidade("Arinos")
      setEstado("MG")
      setCep("38680000")
    }
    setOnline(isOnline);
    if (validaForm()) {

      setProgressEvent(true);
      

      try {

        //Salvando na tabela enderecos
        const saveEndereco = await api.post('/enderecos', {
          logradouro,
          numero,
          complemento,
          bairro,
          cidade,
          estado,
          cep
        });
        const id_endereco = saveEndereco.data.id;
        //console.log(saveEndereco.data);
        //Salvando na tabela periododuracao
        const savePeriodo = await api.post('/periododuracao', {
          inicio,
          fim
        });
        const id_periodo_duracao = savePeriodo.data.id;

        var id_organizador = localStorage.getItem("organizador");

        //Salvando na tabela eventos
        await api.post('/eventos', {
          titulo,
          descricao,
          tipo,
          carga_horaria,
          id_organizador,
          id_periodo_duracao,
          id_endereco,
          status,
          is_online
        });
        openModal();
        setValidate({ ...validate, event: true })
        setValidate({ ...validate, time: true })
        setValidate({ ...validate, address: true })
        setValidate({ ...validate, together: true })
        setValidate({ ...validate, necessary: true })
        setValidate({ ...validate, scholarship: true })
      } catch (err) {
        setValidate({ ...validate, together: false })
      }

      setTimeout(function () {
        history.push("/manager");
      }, 3000)

      setProgressEvent(false);
    } else {
      return <h1>ERROR!</h1>;
    }
  }

  function validaForm() {
    if (!titulo) return setValidateForm({ type: 'error', mensagem: 'Erro: Necessário preencher o campo título!' });
    if (!descricao) return setValidateForm({ type: 'error', mensagem: 'Erro: Necessário preencher o campo descrição!' });
    if (!tipo) return setValidateForm({ type: 'error', mensagem: 'Erro: Necessário preencher o campo tipo!' });
    if (!inicio) return setValidateForm({ type: 'error', mensagem: 'Erro: Necessário preencher o campo início!' });
    if (!fim) return setValidateForm({ type: 'error', mensagem: 'Erro: Necessário preencher o campo fim!' });
    if (!isOnline) {
      if (!estado) return setValidateForm({ type: 'error', mensagem: 'Erro: Necessário preencher o campo estado!' });
      if (!cidade) return setValidateForm({ type: 'error', mensagem: 'Erro: Necessário preencher o campo cidade!' });
      if (!cep) return setValidateForm({ type: 'error', mensagem: 'Erro: Necessário preencher o campo cep!' });
      if (!logradouro) return setValidateForm({ type: 'error', mensagem: 'Erro: Necessário preencher o campo rua!' });
      if (!numero) return setValidateForm({ type: 'error', mensagem: 'Erro: Necessário preencher o campo número!' });
      if (!bairro) return setValidateForm({ type: 'error', mensagem: 'Erro: Necessário preencher o campo bairro!' });
    } else {
      return true
    }

    return true;
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
    history.push('/manager');
  }


  return (
    <Container>
      <ModalConfirm
        showModal={showModal}
        setShowModal={setShowModal}
        message="Evento cadastrado com sucesso!"
      />
      <Header
        user="manager"
        userLogged="Organizador"
        nameItem="Eventos"
        onClickLogout={() => handleLogOut()}
        onClickUsr={() => handleUserInfo()}
        back="true"
        goBack={() => handleGoBack()}
      />
      <Breadcrumb name=" > Edição de Evento" />
      <Content>
        <ViewInputs>
          <form onSubmit={handleSaveEvent}>
            <ViewHeader>
              <Input
                label="Título *"
                type="text"
                value={titulo}
                onChange={event => setTitulo(event.target.value)}
              />
              <Input
                label="Descrição *"
                type="text"
                value={descricao}
                onChange={event => setDescricao(event.target.value)}
              />
              <ViewSelect>
                <LabelSelect>Tipo *</LabelSelect>
                <Select onChange={event => setTipo(event.target.value)}>
                  <option value="">Selecione</option>
                  <option value="Ensino">Ensino</option>
                  <option value="Pesquisa">Pesquisa</option>
                  <option value="Extensão">Extensão</option>
                </Select>
              </ViewSelect>

            </ViewHeader>
            <ViewTime>
              <Input
                label="Início *"
                type="datetime-local"
                value={inicio}
                onChange={event => setInicio(event.target.value)}
              />
              <Input
                label="Fim *"
                type="datetime-local"
                value={fim}
                onChange={event => setFim(event.target.value)}
              />
              <Input
                label="Carga horária (em horas) *"
                type="number"
                value={carga_horaria}
                onChange={event => setCargaHoraria(event.target.value)}
              />
            </ViewTime>
            <ViewRadioButtons>
              <label>Local *</label>
              <ViewOptions>
                <input
                  type="radio"
                  name="isOnline"
                  value={isOnline}
                  
                  onChange={() => {
                    !isOnline ? setIsOnline(true) : setIsOnline(true)
                    console.log("Onli: "+isOnline)
                  }}
                  
                />
                <label>Online</label>
                <input
                  type="radio"
                  name="isOnline"
                  value={isOnline}
                  
                  onChange={()=> {
                    isOnline ? setIsOnline(false) : setIsOnline(false)
                    
                    console.log("Pres: "+isOnline)
                  }}
                />
                <label>Presencial</label>
              </ViewOptions>
            </ViewRadioButtons>
            {!isOnline &&
              <ViewAddress>
                <Input
                  label="Estado *"
                  type="text"
                  value={estado}
                  onChange={event => setEstado(event.target.value)}
                />
                <Input
                  label="Cidade *"
                  type="text"
                  value={cidade}
                  onChange={event => setCidade(event.target.value)}
                />
                <Input
                  label="CEP *"
                  type="text"
                  value={cep}
                  onChange={event => setCep(event.target.value)}
                />
                <Input
                  label="Rua *"
                  type="text"
                  value={logradouro}
                  onChange={event => setLogradouro(event.target.value)}
                />
                <Input
                  label="Número *"
                  type="text"
                  value={numero}
                  onChange={event => setNumero(event.target.value)}
                />
                <Input
                  label="Bairro *"
                  type="text"
                  value={bairro}
                  onChange={event => setBairro(event.target.value)}
                />
              </ViewAddress>
            }
            <ViewError>
              {validateForm.type === 'error' ? <p style={{ color: "tomato" }}>{validateForm.mensagem}</p> : ""}
            </ViewError>
            <ViewButton>
              <Button name="Cadastrar" type="submit" />
            </ViewButton>
          </form>

        </ViewInputs>
      </Content>
    </Container>
  )
}

export default EventoInfo;