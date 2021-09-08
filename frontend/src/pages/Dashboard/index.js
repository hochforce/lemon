import React from 'react';

export default function Dashboard() {
  return (
    <>
      <div className="menu-temp">
        <a href="http://localhost:3000/new-participant">Participante</a>
        <a href="http://localhost:3000/new-manager">Organizador</a>
        <a href="http://localhost:3000/new-event">Evento</a>
        <a href="http://localhost:3000/">Login</a>
        <a href="http://localhost:3000/new-certificate">Gerar Certificado</a>
        <a href="http://localhost:3000/manager">Dash Organizador</a>
      </div>
      <h1>Dashboard</h1>
    </>
  )
}