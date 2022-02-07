import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import { Redirect } from 'react-router-dom';
import { Container, View } from './styles';
import { api } from '../../services/api';
import { Pagination } from '../../components/Pagination';
import Search from '../../components/Search';
import { ModalConfirm } from '../../components/ModalConfirm';
import CardNewEvent from '../../components/CardNewEvent';


export default function Ativos(props) {

  

  const [redirect, setRedirect] = useState('');
  const [eventos, setEventos] = useState([]);
  const userId = localStorage.getItem("USER-ID");
  const [participante, setParticipante] = useState('');
  const [organizador, setOrganizador] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(3);
  const [id, setId] = useState('');
  const [sub, setSub] = useState('');
  const [events, setEvents] = useState([]);
  const [eventsDefault, setEventsDefault] = useState([]);
  

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
    setEventos(paginationInfo.data.eventosList)

    const subscription = await api.get(`/searchSubscribe/${buscaParticipante.data.id}`)
    setSub(subscription)

    const search = await api.get(`/listEventosAtivos/`);
    setEvents(search.data);
    setEventsDefault(search.data)
  }

  useEffect(() => {
    (async function () {
      search()
    })()
  }, [currentPage])

  useEffect(() => {
    filterArray(props.events)
  }, [props.events])


  const filterArray = (event) => {
    var value = event?.toString().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    if ((value || "").length == 0) {
      return setEventos(eventsDefault);
    }

    var result = eventsDefault.filter(function (item) {
      return (item || []).length > 0 || item.titulo?.toString().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(value) > -1
    });
    console.log("result: "+result)
    console.log("eveDeff: "+eventsDefault)
    console.log("eventos: "+eventos)
    setEventos(result)
  }
  

  return (
    <Container>
    
      {
        participante
          ?
          <View>

            {Array.isArray(eventos) && eventos.map((evento) =>
              <>

                <Card
                  title={evento.titulo}
                  description={evento.descricao}
                  onClick={() => {
                    setRedirect(`/inscricao/${evento.id}`)
                  }}
                  status={evento.status}
                  haveSub={evento.haveSub}
                />

              </>
            )}
          </View>

          :

          <View>

            <CardNewEvent
              onClick={() => {
                setRedirect(`/new-event`)
              }}
            />
            {Array.isArray(eventos) && eventos.map((evento) =>
              <Card
                cardManager
                title={evento.titulo}
                description={evento.descricao}
                onClick={() => {
                  setRedirect(`/event-options/${evento.id}`)
                }}
                status={evento.status}
                statusSubscribe="true"
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