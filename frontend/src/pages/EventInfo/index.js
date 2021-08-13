import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import './styles.css';

const EventInfo = ({ match }) => {
  const [evento, setEvento] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [endereco, setEndereco] = useState('');
  const [parceria, setParceria] = useState('');
  const [recurso, setRecurso] = useState('');

  const callEventos = async () => {
    const buscaEventos = await api.get(`/listEventos/${match.params.id}`);
    setEvento(buscaEventos.data);
  };

  const callPeriodos = async () => {
    const buscaPeriodos = await api.get(`/listPeriodos/${evento.id_periodo_duracao}`);
    setPeriodo(buscaPeriodos.data);
  }
console.log("cons no evento!!",evento)
  const callEnderecos = async () => {
    const buscaEnderecos = await api.get(`/listEnderecos/${evento.id_endereco}`);
    setEndereco(buscaEnderecos.data);
  }

  // const callParcerias = async () =>{
  //   const buscaParceria = await api.get(`/listParcerias/${evento.id_parceria}`);
  //   setParceria(buscaParceria.data);
  // }

  // const callRecursos = async () => {
  //   const buscaRecurso = await api.get(`/listRecursos/${evento.id_recurso}`);
  //   setRecurso(buscaRecurso.data);
  // }

  useEffect(() => {
    (async function () {
      callEventos()
    })()
  }, [])

  useEffect(() => {
    (async function () {
      callPeriodos()
    })()
  }, [])

  useEffect(() => {
    (async function () {
      callEnderecos()
    })()
  }, [])

  // useEffect(() => {
  //   (async function () {
  //     callParcerias()
  //   })()
  // }, [])

  // useEffect(() => {
  //   (async function () {
  //     callRecursos()
  //   })()
  // }, [])

  return (
    <>
      <div className="container">
        <h1>DETALHES DO EVENTO</h1>
        <div className="eventoInfo">
          <h2>{evento.titulo}</h2>

          <p>{evento.descricao}</p>
          <p>{evento.tipo}</p>

          <p>+++++++++++++++++++++++++++++</p>
          <p>Acontecerá de {periodo.data_inicio} {periodo.hora_inicio}
            até {periodo.data_fim} {periodo.hora_fim}</p>

          <p>+++++++++++++++++++++++++++++</p>
          <p>O local do evento é:</p>
          <p>Logradouro: {endereco.logradouro}</p>
          <p>Número: {endereco.numero}</p>
          <p>Complemento: {endereco.complemento}</p>
          <p>Bairro: {endereco.bairro}</p>
          <p>Cidade: {endereco.cidade}</p>
          <p>Estado: {endereco.estado}</p>
          <p>CEP: {endereco.cep}</p>

          <p>+++++++++++++++++++++++++++++</p>
          <p>A parceria é:</p>
          <p>Parceiro: {parceria.parceiro}</p>
          <p>Tipo de Parceria: {parceria.tipo_parceria}</p>
          <p>Valor: {parceria.valor}</p>

          <p>+++++++++++++++++++++++++++++</p>
          <p>Os recursos necessários são:</p>
          <p>Materiais: {recurso.materiais}</p>
          <p>Recursos humanos: {recurso.recursos_humanos}</p>
          <p>Instalações: {recurso.instalacoes}</p>

          <p>+++++++++++++++++++++++++++++</p>
          <p>Bolsas:</p>
          <p>Financiamento: { }</p>
          <p>Tipo de bolsa: { }</p>
        </div>

      </div>
    </>
  )
}

export default EventInfo;