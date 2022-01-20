import styled from 'styled-components';

export const Container = styled.div`
margin: 20px 10px 10px 10px;
`
export const SelectComp = styled.select`
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
&:focus {
  outline: none;
}
font: 500 15px 'Montserrat', sans-serif;
color: #4C5175;
`
export const Label = styled.label`
font: 600 16px 'Montserrat', sans-serif;
color: #4C5175;
`