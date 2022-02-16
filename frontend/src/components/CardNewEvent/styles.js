import styled from 'styled-components';
import img from '../../assets/images/more.svg';

export const Container = styled.div`
  width: 330px;
  height: 290px;
  border-radius: 5px;
  border-width: 2px;
  border-style: solid;
  border-color: #4C5175;
  margin: 20px;
  background-color: transparent;
  box-shadow: 3px 5px 10px gray;
  cursor: pointer;
  
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
  border: none;
  cursor: pointer;
  &:hover{
    background-color: transparent;
  }
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
