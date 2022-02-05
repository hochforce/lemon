import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './auth';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import NewEvent from '../pages/NewEvent';
import NewParticipant from '../pages/NewParticipant';
import NewManager from '../pages/NewManager';
import NewCertificate from '../components/NewCertificate';
import Manager from '../pages/Manager';
import Participant from '../pages/Participant';
import Ativos from '../pages/EventosAtivos';
import Finalizados from '../pages/EventosFinalizados';
import UserInfo from '../pages/UserInfo';
import ManagerInfo from '../pages/ManagerInfo';
import EventoInscricao from '../pages/EventoInscricao';
import ListaParticipantes from '../pages/ListaParticipantes';
import EventoInfo from '../pages/EventInfo';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props =>(
    isAuthenticated() ? (
      <Component { ...props } />
    ) : (
      <Redirect to={{pathname: '/', state: { from: props.location }}} />
    )
  )} />
)

export default function Routes(){
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/new-event" component={NewEvent} />
        <Route path="/new-participant" component={NewParticipant} />
        <Route path="/new-manager" component={NewManager} />
        <PrivateRoute path="/new-certificate" component={NewCertificate} />
        <PrivateRoute path="/manager" component={Manager} />
        <PrivateRoute path="/participant" component={Participant} />
        <PrivateRoute path="/eventos-ativos" component={Ativos} />
        <PrivateRoute path="/eventos-finalizados" component={Finalizados} />
        <PrivateRoute path="/user-info/:id" component={UserInfo} />
        <PrivateRoute path="/manager-info/:id" component={ManagerInfo} />
        <PrivateRoute path="/lista-participantes/:id" component={ListaParticipantes} />
        <PrivateRoute path="/inscricao/:id" component={EventoInscricao} />
        <PrivateRoute path="/evento-info/:id" component={EventoInfo} />
      </Switch>
    </BrowserRouter>
  )
}
