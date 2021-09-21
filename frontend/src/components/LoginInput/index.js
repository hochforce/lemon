import { Container, Input } from '../LoginInput/styles';


export const LoginInput = ({ name, placeholder, type, icon, onChange, value }) => {
  return (
    <Container >
      {icon && icon}
      
      <Input 
      placeholder={placeholder} 
      onChange={onChange}
      name={name}
      type={type}
      icon={icon}
      value={value}
      />
    </Container>
  )
}