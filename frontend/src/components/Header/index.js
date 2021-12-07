import { Logo, Container, ItemMenu, View, Menu, IconButton, Button, BackButton, ViewBack } from './styles';
import usr from '../../assets/images/user-circle.svg';
import logout from '../../assets/images/logout.svg';
import backButton from '../../assets/images/back.svg';

export const Header = ({ user, userLogged, back, active, finish, canceled, onClick, onClickUsr, onClickLogout, goBack }) => {

  return (
    <Container>
      <View>
        <Logo> Lemon </Logo>
        {userLogged && <p>Painel do {userLogged}</p>}
      </View>
      {userLogged &&
        <Menu>
          {!back
            ?
            user && user === "manager"
              ?
              <>
                <ItemMenu onClick={()=>onClick({active: true, finish: false, canceled: false})} active={active}>Ativos</ItemMenu>
                <ItemMenu onClick={()=>onClick({active: false, finish: true, canceled: false})} active={finish}>Encerrados</ItemMenu>
                <ItemMenu onClick={()=>onClick({active: false, finish: false, canceled: true})} active={canceled}>Cancelados</ItemMenu>
              </>
              :
              <>
                <ItemMenu onClick={()=>onClick({active: true, finish: false, canceled: false})} active={active}>Ativos</ItemMenu>
                <ItemMenu onClick={()=>onClick({active: false, finish: true, canceled: false})} active={finish}>Encerrados</ItemMenu>
              </>
            :
            <ViewBack onClick={goBack}>
              <p><BackButton src={backButton}/>Voltar</p>
            </ViewBack>
          }
          <Button onClick={onClickUsr}>
            <IconButton src={usr}/>
          </Button>
          <Button onClick={onClickLogout}>
            <IconButton src={logout}/>
          </Button>
        </Menu>
      }
    </Container>
  )
};



