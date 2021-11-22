import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Container, PaginationButton, PaginationItem, Img } from "./styles";
import next from '../../assets/images/next.svg';
import preview from '../../assets/images/preview.svg';


export const Pagination = () => {

  const [eventos, setEventos] = useState([]);
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

  return (
    <Container>
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
    </Container>
  )
}