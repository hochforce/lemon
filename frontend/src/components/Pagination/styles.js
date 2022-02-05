import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: right;
  margin-right: 30px;
  
`

export const PaginationButton = styled.div`
  display: flex;
  
`

export const PaginationItem = styled.div`
margin: 0 2px;
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