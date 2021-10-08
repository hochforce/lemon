import styled from 'styled-components';
import img from '../../assets/images/more.svg';

export const Container = styled.div`
  width: 290px;
  height: 250px;
  padding: 30px;
  border-radius: 5px;
  border-width: 2px;
  border-style: solid;
  border-color: ${({creation})=>creation ? "#4C5175" : "transparent"};
  margin: 20px;
  background-color: ${({creation})=>!creation ? "#fff" : "transparent"};
`
export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const ViewButton = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  &:hover{
    background-color: transparent;
  }
`
export const View = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const Img = styled.img.attrs({
  src: img
})`
  height: 50px;
  width: 50px;
`
export const Title = styled.h1`
  font: 700 20px 'Montserrat', sans-serif;
  color: #4C5175;
`
export const Description = styled.h2`
  font: 700 14px 'Montserrat', sans-serif;
  color: #737373;

`
export const Align = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
`