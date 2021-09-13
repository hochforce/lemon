import styled from "styled-components";

export const Title = styled.label`
margin-bottom: 30px;
color: #4C5175;
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap');
font: 700 30px 'Montserrat', sans-serif;
`

export const Container = styled.div`
/* height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center; */
display: inline-block;
  position: relative;

`
export const Background = styled.img`
margin-left: 0;
margin-top: 2px;
height: 100vw;
width: 100vw;
position: absolute;

`
export const Content = styled.div`
position: absolute;
display: flex;
flex-direction: column;
align-items: center;
margin-top: 25vh;
margin-left: 82vh;

  p {
    color: #4C5175;
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap');
    font: 400 16px 'Montserrat', sans-serif;
    text-decoration: none;
  }
  
`


