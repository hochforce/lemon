import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { api } from '../../services/api';
import { Modal } from '../../components/Modal';
import { Button, Menu, Layout, Row, Col, } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import './styles.css';

const NewEvent = ({ match }) => {
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
  const { Header } = Layout;
  const [redirect, setRedirect] = useState('');
  const userId = localStorage.getItem("organizador");
  const token = localStorage.getItem("TOKEN");
  const [manager, setManager] = useState('');
  const [progressEvent, setProgressEvent] = useState(false);
  const [validate, setValidate] = useState({
    event: undefined,
    time: undefined,
    address: undefined,
    together: undefined,
    necessary: undefined,
    scholarship: undefined
  });

  async function handleSaveEvent() {
    setProgressEvent(true);
    try {
      //Salvando na tabela parcerias
      const saveParceria = await api.post('/parceiros', {
        parceiro,
        tipo_parceria,
        valor
      });
      const id_parceria = saveParceria.data.id;
      console.log(saveParceria.data);
      //Salvando na tabela bolsas
      const saveBolsa = await api.post('/bolsas', {
        financiamento,
        tipo_bolsa
      });
      const { id_bolsa } = saveBolsa.data.id;
      console.log(saveBolsa.data);
      //Salvando na tabela recursos
      const saveRecurso = await api.post('/recursos', {
        id_bolsa,
        materiais,
        recursos_humanos,
        instalacoes
      });

      console.log(saveRecurso.data);
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
      console.log(saveEndereco.data);
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
      setValidate({ ...validate, together: true })
    } catch (err) {
      setValidate({ ...validate, together: false })
    }
    setProgressEvent(false);
  }

  async function search() {
    const buscaCPF = await api.get(`/searchCpf/${userId}`);
    const cpf = buscaCPF.data.cpf;

    const buscaOrganizador = await api.get(`/searchOrganizador/${cpf}`);
    setManager(buscaOrganizador.data);
  }
  useEffect(() => {
    (async function () {
      search()
    })()
  }, [])

  function handleLogOut() {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('organizador');
    setRedirect('/');
  }

  return (
    <>
      <div className="container">

        <div className="header-edicao">
          <div className="logo-edicao" >
            <a href="/manager">LEMON</a>
          </div>
          <div className="titulo-edicao">
            <h1>Criação de Novo Evento</h1>
          </div>
          <div className="user-info-edicao">
            <p style={{ margin: "20px 0px 0px" }}>{manager.nome}</p>
            <Button
              className="button-logout-edicao"
              type="primary"
              icon={<PoweroffOutlined />}
              onClick={handleLogOut}
            >Sair</Button>
          </div>

        </div>

        <div className="eventoInfo">
          <Modal title="Descrição" background={validate.event}>
            <div className="content-modal">
              <div className="content-column">
                <label>Título</label>
                <input name="titulo"
                  placeholder="Título do evento"
                  value={titulo}
                  onChange={event => setTitulo(event.target.value)}
                />
              </div>

              <div className="content-column">
                <label>Descrição</label>
                <input name="descricao"
                  placeholder="Breve descrição"
                  value={descricao}
                  onChange={event => setDescricao(event.target.value)}
                />
              </div>

              <div className="content-column">
                <label>Tipo</label>
                <input name="tipo"
                  placeholder="Qual tipo do Evento?"
                  value={tipo}
                  onChange={event => {
                    setTipo(event.target.value)
                    setStatus("ativo");
                  }}
                />
              </div>
            </div>
          </Modal>
          <Modal title="Data e Horário" background={validate.time}>
            <div className="content-modal">
              <div className="content-column">
                <label>Data Início</label>
                <input name="data_inicio"
                  type="date"
                  value={data_inicio}
                  onChange={event => setDataInicio(event.target.value)}
                />
              </div>

              <div className="content-column">
                <label>Hora Início</label>
                <input name="hora_inicio"
                  type="time"
                  value={hora_inicio}
                  onChange={event => setHoraInicio(event.target.value)}
                />
              </div>

              <div className="content-column">
                <label>Data Fim</label>
                <input name="data_fim"
                  type="date"
                  value={data_fim}
                  onChange={event => setDataFim(event.target.value)}
                />
              </div>

              <div className="content-column">
                <label>Hora Fim</label>
                <input name="hora_fim"
                  type="time"
                  value={hora_fim}
                  onChange={event => setHoraFim(event.target.value)}
                />
              </div>
            </div>

          </Modal>
          <Modal title="Local" background={validate.address}>
            <div className="content-column">
              <div className="content-column">
                <label>Logradouro</label>
                <input name="logradouro"
                  placeholder="Logradouro"
                  value={logradouro}
                  onChange={event => setLogradouro(event.target.value)}
                />
              </div>

              <div className="content-modal">
                <div className="content-column">
                  <label>Número</label>
                  <input name="numero"
                    type="number"
                    placeholder="Número"
                    value={numero}
                    onChange={event => setNumero(event.target.value)}
                  />
                </div>

                <div className="content-column">
                  <label>Complemento</label>
                  <input name="complemento"
                    placeholder="Complemento"
                    value={complemento}
                    onChange={event => setComplemento(event.target.value)}
                  />
                </div>

                <div className="content-column">
                  <label>Bairro</label>
                  <input name="bairro"
                    placeholder="Bairro"
                    value={bairro}
                    onChange={event => setBairro(event.target.value)}
                  />
                </div>
              </div>

              <div className="content-modal">

                <div className="content-column">
                  <label>Cidade</label>
                  <input name="cidade"
                    placeholder="Cidade"
                    value={cidade}
                    onChange={event => setCidade(event.target.value)}
                  />
                </div>

                <div className="content-column">
                  <label>Estado</label>
                  <input name="estado"
                    placeholder="Estado"
                    value={estado}
                    onChange={event => setEstado(event.target.value)}
                  />
                </div>

                <div className="content-column">
                  <label>CEP</label>
                  <input name="cep"
                    placeholder="CEP"
                    value={cep}
                    onChange={event => setCep(event.target.value)}
                  />
                </div>
              </div>
            </div>

          </Modal>
          <Modal title="Parceria" background={validate.together}>
            <div className="content-modal">
              <div className="content-column">
                <label>Parceiro</label>
                <input name="parceiro"
                  placeholder="Parceiro"
                  value={parceiro}
                  onChange={event => setParceiro(event.target.value)}
                />
              </div>

              <div className="content-column">
                <label>Tipo de Parceria</label>
                <input name="tipo_parceria"
                  placeholder="Tipo de Parceria"
                  value={tipo_parceria}
                  onChange={event => setTipoParceria(event.target.value)}
                />
              </div>

              <div className="content-column">
                <label>Valor</label>
                <input name="valor"
                  placeholder="Valor"
                  value={valor}
                  onChange={event => setValor(event.target.value)}
                />
              </div>
            </div>
          </Modal>
          <Modal title="Recursos" background={validate.necessary}>
            <div className="content-modal">
              <div className="content-column">
                <label>Materiais</label>
                <input name="materiais"
                  placeholder="Materiais"
                  value={materiais}
                  onChange={event => setMateriais(event.target.value)}
                />
              </div>

              <div className="content-column">
                <label>Recursos humanos</label>
                <input name="recursos_humanos"
                  placeholder="Recursos Humanos"
                  value={recursos_humanos}
                  onChange={event => setRecursosHumanos(event.target.value)}
                />
              </div>

              <div className="content-column">
                <label>Instalações</label>
                <input name="instalacoes"
                  placeholder="Instalacoes"
                  value={instalacoes}
                  onChange={event => setInstalacoes(event.target.value)}
                />
              </div>
            </div>

          </Modal>
          <Modal title="Bolsas" background={validate.scholarship}>
            <div className="content-modal">

              <div className="content-column">
                <label>Financiamento</label>
                <input name="financiamento"
                  placeholder="Financiamento"
                  value={financiamento}
                  onChange={event => setFinanciamento(event.target.value)}
                />
              </div>

              <div className="content-column">
                <label>Tipo de bolsa</label>
                <input name="tipo_bolsa"
                  placeholder="Tipo de Bolsa"
                  value={tipo_bolsa}
                  onChange={event => setTipoBolsa(event.target.value)}
                />
              </div>
            </div>
          </Modal>
          <button onClick={handleSaveEvent} >
            {!progressEvent ? "Salvar" : <div className="loader"></div>}
          </button>
        </div>

      </div>
      {redirect && <Redirect to={{ pathname: redirect }} />}
    </>
  )
}

export default NewEvent;