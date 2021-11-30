import React from "react";
import { Container, Content, SInput, Label } from './styles.js'

const Input = ({label, type, value, onChange, required}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Content>
        <SInput type={type} value={value} onChange={onChange} required={required}/>
      </Content>
    </Container>
  )
}

export default Input;