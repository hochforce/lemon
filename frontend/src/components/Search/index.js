import React, { useEffect, useState } from "react";
import { Container, Content, ViewButton } from './styles.js'
import { Button } from '../Button';


const Search = ({ onClick }) => {
  const [ value, setValue ] = useState('');

  return (
    <Container>
      <Content onChange={(event)=>{
        onClick(event.target.value)
        setValue(event.target.value)
        }}>
        
      </Content>
      <ViewButton>
        <Button 
        onClick={()=>onClick(value)} 
        name="Pesquisar" />
      </ViewButton>
    </Container>
  )
}

export default Search;