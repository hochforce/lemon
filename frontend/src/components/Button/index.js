import { ButtonStyle } from "./styles";

export const Button = ({ name, onClick })=>{
  return(
    <ButtonStyle onClick={onClick}>
      {name}
    </ButtonStyle>
  )
}