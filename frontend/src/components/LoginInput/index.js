import { Container, Input, Svg } from '../LoginInput/styles';
import usr from '../../assets/images/user.svg';
import psw from '../../assets/images/psw.svg';

export const LoginInput = ({ title }) => {
  return (
    <Container>
      {title ? <Svg src={usr}/> : <Svg src={psw}/>}

      {title?
      <Input placeholder="CPF"/>
      :
      <Input placeholder="Senha" type="password"/>
      }
    </Container>
  )
}