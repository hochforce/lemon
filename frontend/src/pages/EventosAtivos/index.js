import { React } from 'react';
import Card from '../../components/Card';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import { Container, View } from './styles';

export default function Ativos(){
  const [redirect, setRedirect] = useState('');
  return (
    <Container>
      <View>
      <Card 
      creation="true"
      onClick={() => {
        setRedirect(`/new-event`)
      }}
      />
      <Card 
      title="Título do Evento que será realizado no IFNMG - Arinos"
      description="Aqui ficará a descrição de cada evento, com informações iniciais sobre o acontecimento do mesmo."
      onClick={() => {
        setRedirect(`/inscricao`)
      }}
      />
      <Card 
      cardManager="true"
      title="Título do Evento que será realizado no IFNMG - Arinos"
      description="Aqui ficará a descrição de cada evento, com informações iniciais sobre o acontecimento do mesmo."
      onClick={() => {
        setRedirect(`/evento-info`)
      }}
      cancel={() => {
        setRedirect(`/cancelar-evento`)
      }}
      />
      <Card 
      title="Título do Evento que será realizado no IFNMG - Arinos"
      description="Aqui ficará a descrição de cada evento, com informações iniciais sobre o acontecimento do mesmo."
      onClick={() => {
        setRedirect(`/inscricao`)
      }}
      />
      <Card 
      title="Título do Evento que será realizado no IFNMG - Arinos"
      description="Aqui ficará a descrição de cada evento, com informações iniciais sobre o acontecimento do mesmo."
      onClick={() => {
        setRedirect(`/inscricao`)
      }}
      />
      </View>
        {redirect && <Redirect to={{ pathname: redirect }} />}
    </Container>
  )
}