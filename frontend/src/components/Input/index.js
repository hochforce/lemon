import React from "react";
import { Container, Content, SInput, Label } from './styles.js'

const Input = ({label, type, value, onChange}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Content>
        <SInput type={type} value={value} onChange={onChange}/>
      </Content>
    </Container>
  )
}

export default Input;