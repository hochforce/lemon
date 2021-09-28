import { Logo, Container, ItemMenu, View, Menu, IconButton } from './styles';
import usr from '../../assets/images/user-circle.svg';
import logout from '../../assets/images/logout.svg';

export const Header = ({ user, userLogged, back, active, finish, canceled }) => {

  return (
    <Container>
      <View>
        <Logo> Lemon </Logo>
        {userLogged && <p>Página do {userLogged}</p>}
      </View>
      {userLogged &&
        <Menu>
          {!back
            ?
            user && user === "manager"
              ?
              <>
                <ItemMenu active={active}>Ativos</ItemMenu>
                <ItemMenu active={finish}>Encerrados</ItemMenu>
                <ItemMenu active={canceled}>Cancelados</ItemMenu>
              </>
              :
              <>
                <ItemMenu active={active}>Ativos</ItemMenu>
                <ItemMenu active={finish}>Encerrados</ItemMenu>

              </>
            :
            <p>Voltar</p>
          }
          <IconButton src={usr} />
          <IconButton src={logout} />
        </Menu>
      }
    </Container>
  )
};



