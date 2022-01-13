import React, { useEffect, useState } from "react";
import { Container, Content, ViewButton } from './styles.js'
import { Button } from '../Button';
import { api } from "../../services/api.js";

const Search = () => {
  const [event, setEvent] = useState([]);
  async function search() {
    const searchEvents = await api.get(`/listEventosAtivos/`);
    setEvent(searchEvents.data.eventosList);
  }

  useEffect(() => {
    (async function () {
      search()
    })()
  }, [])

  function handleSubmit() {
    
  }
  return (
    <Container>
      <Content>

      </Content>
      <ViewButton>
        <Button onClick={() => handleSubmit()} name="Pesquisar" />
      </ViewButton>
    </Container>
  )
}

export default Search;