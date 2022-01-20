import React, { useEffect, useState } from "react";
import { Container, PaginationButton, PaginationItem, Img } from "./styles";
import next from '../../assets/images/next.svg';
import preview from '../../assets/images/preview.svg';


export const Pagination = ({total, limit, currentPageFunction}) => {

  const [ pages, setPages ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);

  useEffect(()=>{
    
      //Função para arredondar a divisão para cima.
      const totalPages = Math.ceil(total / limit);
      const arrayPages = [];
      for(let i=1; i<= totalPages; i++){
        arrayPages.push(i);
      }
      setPages(arrayPages);
      currentPageFunction(currentPage);
      console.log("Pro"+currentPageFunction)
  }, [currentPage, total]);
  
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