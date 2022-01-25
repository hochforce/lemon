import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import { Redirect } from 'react-router-dom';
import { Container, View } from './styles';
import { api } from '../../services/api';
import { Pagination } from './../../components/Pagination';

export default function Cancelados() {
  const [redirect, setRedirect] = useState('');
  const [eventos, setEventos] = useState([]);
  const userId = localStorage.getItem("USER-ID");
  const [participante, setParticipante] = useState('');
  const [organizador, setOrganizador] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(2);


  async function search() {
    const buscaCpf = await api.get(`/searchCpf/${userId}`);
    const cpf = buscaCpf.data.cpf;

    const buscaParticipante = await api.get(`/searchParticipant/${cpf}`);
    setParticipante(buscaParticipante.data);

    const buscaOrganizador = await api.get(`/searchOrganizador/${cpf}`);
    setOrganizador(buscaOrganizador);

    // const buscaEventosCancelados = await api.get('/listEventosCancelados');
    // setEventos(buscaEventosCancelados.data);

    const paginationInfo = await api.get(`/searchWithLimitCancelado/${currentPage}/${limit}`);
    setTotal(paginationInfo.data.length);
    setEventos(paginationInfo.data.eventosList);

  }

  useEffect(() => {
    (async function () {
      search()
    })()
  }, [])

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
                status={evento.status}

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