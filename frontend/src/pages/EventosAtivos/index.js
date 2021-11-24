import React, { useState, useEffect, useCallback } from 'react';
import Card from '../../components/Card';
import { Redirect } from 'react-router-dom';
import { Container, View } from './styles';
import { api } from '../../services/api';
import { Pagination } from '../../components/Pagination';


export default function Ativos() {
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

    const paginationInfo = await api.get(`/searchWithLimitAtivo/${currentPage}/${limit}`);
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
                onClick={() => {
                  setRedirect(`/inscricao/${evento.id}`)
                }}
                status={evento.status}
              />
            )}
          </View>

          :

          <View>
            <Card
              creation="true"
              onClick={() => {
                setRedirect(`/new-event`)
              }}
            />

            <Card
              cardManager="true"
              title="Título do Evento que será realizado no IFNMG - Arinos"
              description="Aqui ficará a descrição de cada evento, com informações iniciais sobre o acontecimento do mesmo."
              onClick={() => {
                setRedirect(`/evento-info`)
              }}
              cancel={() => {
                setRedirect(`/cancelar-evento`)
              }}
              status="ativo"
            />

            <Card
              cardManager="true"
              title="Título do Evento que será realizado no IFNMG - Arinos"
              description="Aqui ficará a descrição de cada evento, com informações iniciais sobre o acontecimento do mesmo."
              onClick={() => {
                setRedirect(`/evento-info`)
              }}
              cancel={() => {
                setRedirect(`/cancelar-evento`)
              }}
              status="ativo"
            />

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