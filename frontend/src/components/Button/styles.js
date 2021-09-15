import styled from "styled-components";

export const ButtonStyle = styled.button`
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap');
font: 500 20px 'Montserrat', sans-serif;
background: #4c5175;
border: 2px solid #4c5175;
border-radius: 4px;
color: white;
width: 250px;
box-shadow: 0 3px 3px 1px rgba(0, 0, 0, 0.2);
&:hover {
  background-color: #585D87;
  border: 2px solid #585D87;
  transition: 0.5s;
}
`