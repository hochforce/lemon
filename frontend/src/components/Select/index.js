import React from "react";
import { Container, SelectComp, Label} from './styles';

export const Select = ({ label, option}) => {
  
  
  function funcao(even){
    option = even.target.value
  }
  return(
    <Container>
      <Label>{ label }</Label>
      <SelectComp onChange={funcao }>
      <option value="">Selecione</option>
      <option value="1">Ensino</option>
      <option value="2">Pesquisa</option>
      <option value="3">Extensão</option>
      </SelectComp>
    </Container>
  )
}