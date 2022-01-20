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
  const [subscribe, setSubscribe] = useState([]);
  const [id, setId] = useState('');




  async function search() {
    const buscaCpf = await api.get(`/searchCpf/${userId}`);
    const cpf = buscaCpf.data.cpf;

    const buscaParticipante = await api.get(`/searchParticipant/${cpf}`);
    setParticipante(buscaParticipante.data);
    setId(buscaParticipante.data.id);


    const buscaOrganizador = await api.get(`/searchOrganizador/${cpf}`);
    setOrganizador(buscaOrganizador);

    const paginationInfo = await api.get(`/searchWithLimitAtivo/${currentPage}/${limit}`);
    setTotal(paginationInfo.data.length);
    setEventos(paginationInfo.data.eventosList);
console.log("Esse: "+paginationInfo.data.eventosList[0].titulo)
console.log("Esse2: "+currentPage)
  }
  async function search2() {
    const trem = await api.get(`/searchSubscribe/${id}`)
    setSubscribe(trem.data)
  }
  console.log("Trem: " + subscribe.map((res) => {
    return console.log("O do trem: " + res.id_evento)
  }))

  //Tá tudo dentro do estado subscribe

  useEffect(() => {
    (async function () {
      search()
      search2()
    })()
  }, [id])

  return (
    <Container>

      {
        participante
          ?
          <View>

            {Array.isArray(eventos) && eventos.map((evento) =>
              <>
                {subscribe.id_evento === evento.id ? console.log("Dis") : console.log("HTML: " + evento.id)}

                <Card
                  title={evento.titulo}
                  description={evento.descricao}
                  onClick={() => {
                    setRedirect(`/inscricao/${evento.id}`)
                  }}
                  status={evento.status}
                  statusSubscribe="true"

                />

              </>
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
            {Array.isArray(eventos) && eventos.map((evento) =>
              <Card
                title={evento.titulo}
                description={evento.descricao}
                onClick={() => {
                  setRedirect(`/inscricao/${evento.id}`)
                }}
                status={evento.status}
                statusSubscribe="true"
              />
            )}
            

          </View>
      }
      {/* O problema está aqui. O curr.. não está recebendo o valor do clique */}
      <Pagination
        currentPageFunction={(page) => setCurrentPage(page)}
        total={total}
        limit={limit}
      />

      {redirect && <Redirect to={{ pathname: redirect }} />}
    </Container>
  )
}