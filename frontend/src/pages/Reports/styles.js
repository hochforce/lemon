import styled from "styled-components";

export const Container = styled.div`
height: 100vh;
`
export const Content = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
h1{
  font: 700 35px 'Montserrat', sans-serif;
  color: #4c5175;
}
p{
  margin-top: 5px;
  font: 500 20px 'Montserrat', sans-serif;
  color: #4c5175;
}
`
export const List = styled.h1`
  border-radius: 5px;
  border-color: transparent;
  background-color: #fff;
  box-shadow: 3px 5px 10px gray;
  width: 600px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 20px 20px;
  margin: 2px;
  p{
    font: 600 20px 'Montserrat', sans-serif;
    color: ${({present})=> present ? "green" : "tomato"};
  }
`