import { CommonButton, LoginButton } from "./styles";

export const Button = ({ name, onClick, loginButton, disabled, type, haveSub }) => {
  return (
    <>
      {
        loginButton
          ?
          <LoginButton onClick={onClick} >
            {name}
          </LoginButton>
          :
          <CommonButton onClick={onClick} disabled={disabled} type={type} haveSub={haveSub}>
            {name}
          </CommonButton>
      }
    </>
  )
}