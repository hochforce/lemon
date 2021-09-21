import { Logo, Container, ItemMenu, View, Menu, IconButton } from './styles';
import usr from '../../assets/images/user-circle.svg';
import logout from '../../assets/images/logout.svg';

export const Header = ({ user, userLogged, nameItem }) => {
  if (user === "manager") {
    return (
      <Container>
        <View>
          <Logo> Lemon </Logo>
          {userLogged && <p>Página do {userLogged}</p>}
        </View>
        <Menu>
          <ItemMenu>Ativos</ItemMenu>
          <ItemMenu>Encerrados</ItemMenu>
          <ItemMenu>Cancelados</ItemMenu>
          <IconButton src={usr}/>
          <IconButton src={logout}/>
        </Menu>
      </Container>
    )
  }
  else {
    return (
      <Container>
        <View>
          <Logo> Lemon </Logo>
          {userLogged && <p>Página do {userLogged}</p>}
        </View>
        <Menu>
          <ItemMenu>Ativos</ItemMenu>
          <ItemMenu>Encerrados</ItemMenu>
        </Menu>
      </Container>
    )
  }

}