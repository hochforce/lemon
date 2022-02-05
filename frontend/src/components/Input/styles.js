import styled from 'styled-components';


export const Container = styled.div`
margin: 20px 10px 10px 10px;
`
export const Content = styled.div`
margin-top: 10px;
height: 50px;
width: 250px;
display: flex;
flex-direction: row;
align-items: center;
padding: 5px;
border: 1px solid #E5E5E5;
box-sizing: border-box;
border-radius: 4px;
background-color: white;
`
export const SInput = styled.input`
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;1,400&display=swap');
font: 300 20px 'Roboto', sans-serif;
height: 40px;
width: 200px;
border: none;
color: ${({disabled})=> disabled ? "rgba(76, 81, 117, 0.5)" : "#4C5175"};
background-color: white;
&:focus {
  border: none;
  outline: none;
}
&::-webkit-inner-spin-button, 
&::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
`
export const Label = styled.label`
font: 600 16px 'Montserrat', sans-serif;
color: #4C5175;
`
