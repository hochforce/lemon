import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import './styles.css';

const EventInfo = ({ match }) => {
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
        <h1>DETALHES DO EVENTO</h1>
        <div className="eventoInfo">
          <h2>{value.titulo}</h2>
          <p>{console.log(value)}</p>
        </div>

      </div>
    </>
  )
}

export default EventInfo;