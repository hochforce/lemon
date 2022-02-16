import styled from 'styled-components';

export const Container = styled.div`
  width: 270px;
  height: 230px;
  padding: 30px;
  border-radius: 5px;
  border-width: 2px;
  border-style: solid;
  border-color: ${({creation})=>creation ? "#4C5175" : "transparent"};
  margin: 20px;
  background-color: ${({creation})=>!creation ? "#fff" : "transparent"};
  box-shadow: 3px 5px 10px gray;
  cursor: pointer;
  
`
export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const View = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const Title = styled.h1`
  font: 700 20px 'Montserrat', sans-serif;
  color: #4C5175;
`
export const Description = styled.h2`
  font: 700 14px 'Montserrat', sans-serif;
  color: #737373;

`
export const Align = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
`
export const Error = styled.div`
 p{
  font: 600 16px 'Montserrat', sans-serif;
  color: tomato;
 }
`