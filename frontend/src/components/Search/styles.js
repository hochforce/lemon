import styled from 'styled-components';

export const Container = styled.div`
margin: 20px 10px 10px 10px;
display: flex;

justify-content: flex-end;
`
export const Content = styled.input`
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;1,400&display=swap');
margin-top: 10px;
display: flex;
flex-direction: row;
align-items: center;
padding: 5px;
box-sizing: border-box;
border-radius: 8px;
background-color: white;
font: 300 20px 'Roboto', sans-serif;
height: 40px;
width: 250px;
border: none;
color: #4C5175;
&:focus {
  border: none;
  outline: none;
}
`
export const ViewButton = styled.div`
margin-top: -10px;
margin-left: 10px;
margin-right: 30px;
`

