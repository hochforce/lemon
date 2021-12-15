import styled from 'styled-components';

export const Container = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
margin: 0px 20px 0px 20px;
`

export const Logo = styled.h1`
color: #4C5175;
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap');
font: 700 30px 'Montserrat', sans-serif;
`

export const Menu = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
  p {
    font: 600 16px 'Montserrat', sans-serif;
    margin-right: 20px;
    color: #4C5175;
    display: flex;
    align-items: center;
    flex-direction: row;
    cursor: pointer;
  }
`

export const ItemMenu = styled.div`
color: #4C5175;
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap');
font: 600 16px 'Montserrat', sans-serif;
margin-right: 20px;
text-decoration: ${({ active })=> active ? "underline" : "none"};
cursor: pointer;
`

export const View = styled.div`
display: flex;
flex-direction: row;
align-items: baseline;
  p {
    color: #4C5175;
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap');
    font: 400 14px 'Montserrat', sans-serif;
    margin-left: 10px;
  }
`
export const IconButton = styled.img`
border-radius: 50%;
height: 30px;
width: 30px;

`

export const Button = styled.button`
background-color: transparent;
height: 30px;
width: 30px;
margin: 0px 5px 0px 0px !important;
margin-right: 20px;
padding: 0;
border: none;
cursor: pointer;
&:hover{
  background-color: transparent;
}
`

export const BackButton = styled.img`
margin-right: 5px;
`

export const ViewBack = styled.button`
border: none;
background-color: transparent;
`