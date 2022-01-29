import styled from "styled-components";

export const CommonButton = styled.button`
font: 600 20px 'Montserrat', sans-serif;
background: transparent;
border: 2px solid ${({disabled, haveSub})=> disabled || haveSub === true ? "rgba(76, 81, 117, 0.5)" : "#4c5175"};
border-radius: 8px;
color: ${({disabled, haveSub})=> disabled || haveSub === true ? "rgba(76, 81, 117, 0.5)" : "#4c5175"};
width: 120px;
padding: 5px 0 5px 0;
margin-top: 20px;
cursor: pointer;

&:hover {
  color: ${({disabled, haveSub})=> disabled || haveSub === true ? "rgba(76, 81, 117, 0.5)" : "#fff"};
  background-color: ${({disabled, haveSub})=> disabled || haveSub === true ? "transparent" : "#4c5175"};
  border: 2px solid ${({disabled, haveSub})=> disabled || haveSub === true ? "rgba(76, 81, 117, 0.5)" : "#4c5175"};
  transition: 0.5s;
}
`
export const LoginButton = styled.button`
font: 600 20px 'Montserrat', sans-serif;
background: #4c5175;
border: 2px solid #4c5175;
border-radius: 4px;
color: white;
width: 250px;
box-shadow: 0 3px 3px 1px rgba(0, 0, 0, 0.2);
cursor: pointer;
padding: 10px 0 10px 0;
margin-top: 20px;
&:hover {
  background-color: #585D87;
  border: 2px solid #585D87;
  transition: 0.5s;
}
`