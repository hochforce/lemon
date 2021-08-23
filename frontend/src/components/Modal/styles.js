import styled from 'styled-components';


export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`

export const Headerm = styled.header`
  background-color: ${({ background }) => {
    if (background === undefined) {
      return '#c4c4c4';
    }
    if (!background) {
      return '#ef5350'
    }
    return '#a2fcc4'
  }} !important;
  width: 80% !important;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 4px 4px 0 0;
`
export const Content = styled.div`
  width: 80%;
  padding: ${({ showModal }) => showModal ? '16px' : '0px'};
  background-color: #f5f5f5;
  height: ${({ showModal }) => showModal ? 'auto' : '0px'};
  border-radius: 0 0 4px 4px;
`

export const Title = styled.h1`
  color: #062500 !important;
  margin-left: 30px !important;
`
export const Icon = styled.div`
  margin-right: 30px;
`


