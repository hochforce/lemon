import React, { useState, useEffect, useCallback } from 'react';
import Card from '../../components/Card';
import { Redirect } from 'react-router-dom';
import { Container, View, Pagination, PaginationButton, PaginationItem, Img } from './styles';
import { api } from '../../services/api';
import next from '../../assets/images/next.svg';
import preview from '../../assets/images/preview.svg';

export default function Ativos() {
  const [redirect, setRedirect] = useState('');
  const [eventos, setEventos] = useState([]);
  const userId = localStorage.getItem("USER-ID");
  const [participante, setParticipante] = useState('');
  const [organizador, setOrganizador] = useState('');

  //Pagination Itens
  const [ total, setTotal ] = useState(0);
  const [ limit, setLimit ] = useState(2);
  const [ pages, setPages ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);

  useEffect(()=>{
    async function pagination(){
      const response = await api.get(`/searchWithLimitAtivo/${currentPage}/${limit}`);
      setTotal(response.data.length);

      //Função para arredondar a divisão para cima.
      const totalPages = Math.ceil(total / limit);
      const arrayPages = [];
      for(let i=1; i<= totalPages; i++){
        arrayPages.push(i);
      }
      setPages(arrayPages);
      setEventos(response.data.eventosList);
    }
    pagination();
  }, [total, limit, currentPage]);

  async function search() {
    const buscaCpf = await api.get(`/searchCpf/${userId}`);
    const cpf = buscaCpf.data.cpf;

    const buscaParticipante = await api.get(`/searchParticipant/${cpf}`);
    setParticipante(buscaParticipante.data);

    const buscaOrganizador = await api.get(`/searchOrganizador/${cpf}`);
    setOrganizador(buscaOrganizador);
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
 
      <Pagination>
        {/* <div>Total: {total}</div> */}
        <PaginationButton>
          {currentPage > 1 &&
            <PaginationItem onClick={() => setCurrentPage(currentPage - 1)}><Img src={preview} /></PaginationItem>
          }
          {pages.map(page => (
            <PaginationItem
              isSelect={page === currentPage}
              key={page} onClick={() => setCurrentPage(page)}>
              {page}
            </PaginationItem>
          ))}
          {currentPage < pages.length &&
            <PaginationItem onClick={() => setCurrentPage(currentPage + 1)}><Img src={next} /></PaginationItem>
          }
        </PaginationButton>
      </Pagination>

      {redirect && <Redirect to={{ pathname: redirect }} />}
    </Container>
  )
}