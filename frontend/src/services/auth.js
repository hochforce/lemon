//export const isAuthenticated = () => true;


export const isAuthenticated = () =>  {
  return Boolean(localStorage.getItem('TOKEN'));
}
//Criar aqui a lógica de autenticação
//Ir no local storage do navegador e buscar o token de autenticação jwt