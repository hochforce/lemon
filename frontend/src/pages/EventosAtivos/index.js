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
  const [limit, setLimit] = useState(3);
  const [subscribe, setSubscribe] = useState([]);
  const [id, setId] = useState('');
  const [sub, setSub] = useState('');


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




    
      // var list = []
      // paginationInfo.data.eventosList.map((eventos) => {
      //   subscription.data.map((even) => {
      //     if (eventos.id === even.id_evento) {
      //       list.push({
      //         ...eventos,
      //         haveSub: true
      //       })
      //     } else {
      //       list.push({
      //         ...eventos,
      //         haveSub: false
      //       })
      //     }
      //   })
      // })

      // const removeArray = list.filter(function (a) {
      //   return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true)
      // }, Object.create(null))

      // var newList = []
      // list.forEach(item => {
      //   var duplicated = newList.findIndex(renderItem => {
      //     return item.id == renderItem.id
      //   }) > -1

      //   if (!duplicated) {
      //     newList.push(item)
      //   }
      // })
      // setEventos(newList)
    

  }
  useEffect(() => {
    (async function () {
      search()

    })()
  }, [id])

  console.log(eventos)

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

            <Card
              creation="true"
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