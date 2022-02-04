import styled from "styled-components";

export const Container = styled.div`
  align-items: flex-end;
  flex-direction: column;
`
export const View = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`

export const Pagination = styled.div`
  display: flex;
  justify-content: right;
`

export const PaginationButton = styled.div`
  display: flex;
`

export const PaginationItem = styled.div`
margin: 0 10px;
cursor: pointer;
color: #4c5175;
font: 600 20px 'Montserrat', sans-serif;
padding: 4px 10px;
border: 2px solid #4c5175;
border-radius: 4px;

${props => props.isSelect && {
  background: '#f8f8f8',
}}
`

export const Img = styled.img`
width: 20px;
height: 20px;
`