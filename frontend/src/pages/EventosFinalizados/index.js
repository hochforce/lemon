import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import { Redirect } from 'react-router-dom';
import { Container, View } from './styles';
import { api } from '../../services/api';
import { Pagination } from '../../components/Pagination';
import NewCertificate from '../../components/NewCertificate';

export default function Finalizados() {
  const [redirect, setRedirect] = useState('');
  const [eventos, setEventos] = useState([]);
  const userId = localStorage.getItem("USER-ID");
  const [participante, setParticipante] = useState('');
  const [organizador, setOrganizador] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(2);
  const cargaHoraria = 22;


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
    console.log(paginationInfo.data.eventosList)
    
  }

  useEffect(() => {
    (async function () {
      search()
    })()
  }, [])
  console.log("BBBBB:"+JSON.stringify(eventos))
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
                  NewCertificate(
                    `${participante.nome} ${participante.sobrenome}`,
                    `${evento.titulo}`,
                    `${cargaHoraria}`,
                    `${evento.id_endereco}`,
                    `${evento.id_periodo_duracao}`
                  )
                }}
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