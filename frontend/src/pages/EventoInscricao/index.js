import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import './styles.css';

const EventInscricao = ({ match }) => {
  const [value, setValue] = useState('');

  const call = async () => {
    const response = await api.get(`/listEventos/${match.params.id}`);
    setValue(response.data);
  };

  useEffect(() => {
   (async function (){
     call()
   })()
  }, [])

  return (
    <>
      <div className="container">
        <h1>Página de Inscrição no Evento Selecionado</h1>
        <div className="eventoInfo">
          <h2>{value.titulo}</h2>
          <p>{value.descricao}</p>
        </div>

      </div>
    </>
  )
}

export default EventInscricao;