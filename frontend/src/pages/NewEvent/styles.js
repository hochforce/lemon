import styled from "styled-components";

export const Container = styled.div`
height: 100vh;
background-color: #f8f8f8;
`
export const Content = styled.div`
display: flex;
justify-content: center;
`
export const ViewInputs = styled.div`
margin-top: 30px;
width: 600px;
display: flex;
flex-wrap: wrap;
label {
    font: 600 16px 'Montserrat', sans-serif;
    color: #4C5175;
  }
`
export const ViewButton = styled.div`
display: flex;
align-items: center;

`
export const ViewHeader = styled.div`

display: flex;
flex-direction: row;
`
export const ViewTime = styled.div`

display: flex;
flex-direction: row;
flex-wrap: wrap;
`
export const ViewAddress = styled.div`

display: flex;
flex-direction: row;
flex-wrap: wrap;
`
export const ViewRadioButtons = styled.div`
margin-right: 500px;
margin-top: 20px;
margin-left: 10px;
margin-bottom: 20px;
height: 50px;
width: 250px;
display: flex;
flex-direction: column;
  

  input:nth-child(3) {
    margin-left: 50px;
  }
  label {
    font: 600 16px 'Montserrat', sans-serif;
    color: #4C5175;
    
  }
`
export const ViewOptions = styled.div`
margin-top: 20px;
display: flex;
align-content: center;
align-items: center;
`
export const ViewSelect = styled.div`
margin: 20px 10px 10px 10px;
`
export const Select = styled.select`
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
export const LabelSelect = styled.label`
font: 600 16px 'Montserrat', sans-serif;
color: #4C5175;
`
export const ViewError = styled.div`
 p{
  font: 600 16px 'Montserrat', sans-serif;
 }
`