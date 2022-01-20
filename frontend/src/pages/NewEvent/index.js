import React, { useState } from 'react';
import { api } from '../../services/api';
import { Container, Content, ViewButton, ViewInputs, ViewRadioButtons, ViewOptions, ViewHeader, ViewTime, ViewAddress, Select, LabelSelect, ViewSelect, ViewError } from "./styles"
import { Header } from './../../components/Header/index';
import Input from './../../components/Input/index';
import { Button } from "../../components/Button";
import { Breadcrumb } from './../../components/Breadcrumb/index';

const NewEvent = ({ match, history }) => {
  const [redirect, setRedirect] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState('');
  const [data_inicio, setDataInicio] = useState('');
  const [hora_inicio, setHoraInicio] = useState('');
  const [data_fim, setDataFim] = useState('');
  const [hora_fim, setHoraFim] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  const [parceiro, setParceiro] = useState('');
  const [tipo_parceria, setTipoParceria] = useState('');
  const [valor, setValor] = useState('');
  const [materiais, setMateriais] = useState('');
  const [recursos_humanos, setRecursosHumanos] = useState('');
  const [instalacoes, setInstalacoes] = useState('');
  const [financiamento, setFinanciamento] = useState('');
  const [tipo_bolsa, setTipoBolsa] = useState('');
  const [status, setStatus] = useState('');
  const userId = localStorage.getItem("organizador");
  const token = localStorage.getItem("TOKEN");
  const [manager, setManager] = useState('');
  const [progressEvent, setProgressEvent] = useState(false);
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

  async function handleSaveEvent(e) {
    e.preventDefault();
    if (validaForm()) {
      
      setProgressEvent(true);
      
      try {
        //Salvando na tabela parcerias
        const saveParceria = await api.post('/parceiros', {
          parceiro,
          tipo_parceria,
          valor
        });
        const id_parceria = saveParceria.data.id;
        //console.log(saveParceria.data);
        //Salvando na tabela bolsas
        const saveBolsa = await api.post('/bolsas', {
          financiamento,
          tipo_bolsa
        });
        const { id_bolsa } = saveBolsa.data.id;
        //console.log(saveBolsa.data);
        //Salvando na tabela recursos
        const saveRecurso = await api.post('/recursos', {
          id_bolsa,
          materiais,
          recursos_humanos,
          instalacoes
        });

        //console.log(saveRecurso.data);
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
          data_inicio,
          hora_inicio,
          data_fim,
          hora_fim
        });
        const id_periodo_duracao = savePeriodo.data.id;

        var id_organizador = localStorage.getItem("organizador");

        //Salvando na tabela eventos

        const saveEvento = await api.post('/eventos', {
          titulo,
          descricao,
          tipo,
          id_organizador,
          id_periodo_duracao,
          id_parceria,
          id_endereco,
          status
        });

        setValidate({ ...validate, event: true })
        setValidate({ ...validate, time: true })
        setValidate({ ...validate, address: true })
        setValidate({ ...validate, together: true })
        setValidate({ ...validate, necessary: true })
        setValidate({ ...validate, scholarship: true })
      } catch (err) {
        setValidate({ ...validate, together: false })
      }
      history.push("/manager");
      setProgressEvent(false);
    } else {
      return <h1>ERROR!</h1>;
    }
  }

  function validaForm() {
    if (!titulo) return setValidateForm({ type: 'error', mensagem: 'Erro: Necessário preencher o campo Titulo!' });
    if (!descricao) return setValidateForm({ type: 'error', mensagem: 'Erro: Necessário preencher o campo Descrição!' });
    if (!tipo) return setValidateForm({ type: 'error', mensagem: 'Erro: Necessário preencher o campo Tipo!' });
    if (!data_inicio) return setValidateForm({ type: 'error', mensagem: 'Erro: Necessário preencher o campo Data Início!' });
    if (!hora_inicio) return setValidateForm({ type: 'error', mensagem: 'Erro: Necessário preencher o campo Hora início!' });
    if (!data_fim) return setValidateForm({ type: 'error', mensagem: 'Erro: Necessário repetir a data fim!' });
    if (!hora_fim) return setValidateForm({ type: 'error', mensagem: 'Erro: Necessário repetir a hora fim!' });
    if (!isOnline) {
      if (!estado) return setValidateForm({ type: 'error', mensagem: 'Erro: Necessário repetir a estado!' });
      if (!cidade) return setValidateForm({ type: 'error', mensagem: 'Erro: Necessário repetir a cidade!' });
      if (!cep) return setValidateForm({ type: 'error', mensagem: 'Erro: Necessário repetir a cep!' });
      if (!logradouro) return setValidateForm({ type: 'error', mensagem: 'Erro: Necessário repetir a rua!' });
      if (!numero) return setValidateForm({ type: 'error', mensagem: 'Erro: Necessário repetir a número!' });
      if (!bairro) return setValidateForm({ type: 'error', mensagem: 'Erro: Necessário repetir a bairro!' });
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

      <Header
        user="manager"
        userLogged="Organizador"
        nameItem="Eventos"
        onClickLogout={() => handleLogOut()}
        onClickUsr={() => handleUserInfo()}
        back="true"
        goBack={() => handleGoBack()}
      />
      <Breadcrumb name=" > Cadastro de Evento" />
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
                label="Data início *"
                type="date"
                value={data_inicio}
                onChange={event => setDataInicio(event.target.value)}
              />
              <Input
                label="Hora início *"
                type="time"
                value={hora_inicio}
                onChange={event => setHoraInicio(event.target.value)}
              />
              <Input
                label="Data fim *"
                type="date"
                value={data_fim}
                onChange={event => setDataFim(event.target.value)}
              />
              <Input
                label="Hora fim *"
                type="time"
                value={hora_fim}
                onChange={event => setHoraFim(event.target.value)}
              />
            </ViewTime>
            <ViewRadioButtons>
              <label>Local *</label>
              <ViewOptions>
                <input
                  type="radio"
                  name="isOnline"
                  value={isOnline}
                  onChange={event => setIsOnline(true)}
                />
                <label>Online</label>
                <input
                  type="radio"
                  name="isOnline"
                  value={isOnline}
                  onChange={event => setIsOnline(false)}
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

export default NewEvent;