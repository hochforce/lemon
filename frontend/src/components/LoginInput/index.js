import { Container, Input, Svg } from '../LoginInput/styles';
import usr from '../../assets/images/person-outline.svg';
import psw from '../../assets/images/psw.svg';

export const LoginInput = ({ title }) => {
  return (
    <Container>
      <Svg src={usr}/> 
      {title?
      
      <Input placeholder="CPF"/>
      :
      
      <Input placeholder="Senha" type="password"/>
      }
    </Container>
  )
}