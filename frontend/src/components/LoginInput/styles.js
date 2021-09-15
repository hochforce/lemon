import styled from "styled-components";


export const Container = styled.div`
margin-top: 20px;
height: 50px;
width: 250px;
display: flex;
flex-direction: row;
align-items: center;
padding: 5px;
border: 1px solid #4C5175;
box-sizing: border-box;
border-radius: 4px;
`

export const Input = styled.input`
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;1,400&display=swap');
font: 300 20px 'Roboto', sans-serif;
height: 40px;
width: 200px;
border: none;
color: #4C5175;
background-color: transparent;
&:focus {
  border: none;
  outline: none;
}
`