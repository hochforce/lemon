import styled from "styled-components";

export const Title = styled.label`
margin-bottom: 30px;
color: #4C5175;
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap');
font: 700 30px 'Montserrat', sans-serif;
`

export const Container = styled.div`
height: 100vh;
width: 100%;
position: relative;
flex: 1;
display: flex;
align-items: center;
justify-content: center;
background-color: #bce7d9;
z-index: 1;
`
export const Background = styled.img`
z-index: -1;
height: auto;
width: 100%;
position: absolute;
background-repeat: no-repeat;
background-size: contain;
`
export const Content = styled.div`
z-index: 1;
display: flex;
flex-direction: column;
align-items: center; 
`

export const View = styled.div`
width: 100%;
display: flex;
align-items: flex-start;
margin-top: 0;
p {
    color: #4C5175;
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap');
    font: 400 18px 'Montserrat', sans-serif;
    text-decoration: none;
  }
`
export const Svg = styled.img`
margin-right: 8px;
height: 30px;
width: 30px;
`
export const ViewError = styled.div`
 p{
  font: 400 16px 'Montserrat', sans-serif;
 }
`
