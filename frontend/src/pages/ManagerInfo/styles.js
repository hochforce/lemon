import styled from "styled-components";

export const Container = styled.div`
height: 100vh;
`
export const Content = styled.div`
display: flex;
justify-content: center;
`
export const ViewInputs = styled.div`
margin-top: 30px;
width: 600px;
display: flex;
flex-wrap: wrap;
`
export const View = styled.div`
display: flex;
flex-direction: row;
align-items: center;
margin-left: 10px;
`
export const P = styled.div`
margin: 23px 0 0 10px;
p {
    color: #4C5175;
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap');
    font: 400 18px 'Montserrat', sans-serif;
    text-decoration: none;
  }
`
export const ViewError = styled.div`
width: 500px;
display: flex;
flex-direction: row;
align-items: center;
margin-left: 10px;
 p{
  font: 600 16px 'Montserrat', sans-serif;
 }
`