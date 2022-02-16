import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import { Redirect } from 'react-router-dom';
import { Container, View } from './styles';
import { api } from '../../services/api';
import { Pagination } from '../../components/Pagination';
import NewCertificate from '../../components/NewCertificate';

export default function Finalizados() {
  const [status, setStatus] = useState('');

  const [redirect, setRedirect] = useState('');
  const [eventos, setEventos] = useState([]);
  const userId = localStorage.getItem("USER-ID");
  const [participante, setParticipante] = useState('');
  const [organizador, setOrganizador] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(2);
  const [presence, setPresence] = useState(false);
  const [subscribe, setSubscribe] = useState(false);




  async function search() {
    const buscaCpf = await api.get(`/searchCpf/${userId}`);
    const cpf = buscaCpf.data.cpf;

    const buscaParticipante = await api.get(`/searchParticipant/${cpf}`);
    setParticipante(buscaParticipante.data);

    const buscaOrganizador = await api.get(`/searchOrganizador/${cpf}`);
    setOrganizador(buscaOrganizador);

    const paginationInfo = await api.get(`/searchWithLimitFinalizado/${currentPage}/${limit}`);
    setTotal(paginationInfo.data.length);
    setEventos(paginationInfo.data.eventosList);


  }

  useEffect(() => {
    (async function () {
      search()
    })()
  }, [])

  async function checkSubscribe(idParticipant, idEvento) {

    const check = await api.get(`/subscribe/${idParticipant}/${idEvento}`)
    setSubscribe(check.data)

    if (check.PromiseResult) {
      return true;
    } else {
      return false;
    }

  }

  async function checkPresence(nome, titulo, cargaHoraria, idEndereco, idPeriodo, idParticipant, idEvento) {

    const check = await api.get(`/isPresent/${idParticipant}/${idEvento}`)
    setPresence(check.data)
    
    if (check.data) {
      NewCertificate(
        `${nome}`,
        `${titulo}`,
        `${cargaHoraria}`,
        `${idEndereco}`,
        `${idPeriodo}`,
        `${idParticipant}`,
        `${idEvento}`
      )
    } else {
      setStatus('Presença não confirmada!')
      
    }
  }


  return (
    <Container>

      {
        participante
          ?
          <View>
            {Array.isArray(eventos) && eventos.map((evento) =>

              <Card
                title={evento.titulo}
                description={evento.descricao}
                onClick={() => {
                  
                  checkPresence(
                    `${participante.nome} ${participante.sobrenome}`,
                    `${evento.titulo}`,
                    `${evento.carga_horaria}`,
                    `${evento.id_endereco}`,
                    `${evento.id_periodo_duracao}`,
                    `${participante.id}`,
                    `${evento.id}`,
                    `${participante.id}`
                  )
                }}
                status={evento.status}
                message={status}
              />
            )}
          </View>

          :

          <View>
            {Array.isArray(eventos) && eventos.map((evento) =>
              <Card
                cardManager
                title={evento.titulo}
                description={evento.descricao}
                onClick={() => {
                  setRedirect(`/evento-info`)
                }}
                status={evento.status}
              />
            )}
          </View>
      }

      <Pagination
        currentPageFunction={(page) => setCurrentPage(page)}
        total={total}
        limit={limit}
      />
      {redirect && <Redirect to={{ pathname: redirect }} />}
    </Container>
  )
}