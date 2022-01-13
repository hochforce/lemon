import { CommonButton, LoginButton } from "./styles";

export const Button = ({ name, onClick, loginButton, unavailable, type }) => {
  return (
    <>
      {
        loginButton
          ?
          <LoginButton onClick={onClick} >
            {name}
          </LoginButton>
          :
          <CommonButton onClick={onClick} unavailable={unavailable} type={type}>
            {name}
          </CommonButton>
      }
    </>
  )
}