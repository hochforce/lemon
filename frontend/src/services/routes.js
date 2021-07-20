import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './auth';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import NewEvent from '../pages/NewEvent';
import NewParticipant from '../pages/NewParticipant';
import NewManager from '../pages/NewManager';
import NewCertificate from '../pages/NewCertificate';
import Manager from '../pages/Manager';
import Participant from '../pages/Participant';
import EventoInfo from '../pages/EventInfo';
import EventoInscricao from '../pages/EventoInscricao';

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
        <Route path="/" exact component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/new-event" component={NewEvent} />
        <Route path="/new-participant" component={NewParticipant} />
        <Route path="/new-manager" component={NewManager} />
        <PrivateRoute path="/new-certificate" component={NewCertificate} />
        <PrivateRoute path="/manager" component={Manager} />
        <PrivateRoute path="/participant" component={Participant} />
        <PrivateRoute path="/evento-info/:id" component={EventoInfo} />
        <PrivateRoute path="/inscricao/:id" component={EventoInscricao} />*asYup
      </Switch>
    </BrowserRouter>
  )
}
