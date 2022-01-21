import React, { useEffect } from "react";
import { Background, ModalContent } from './styles';

export const ModalConfirm = ({showModal, setShowModal}) => {
  
  useEffect(() => {
    setTimeout(function(){
      setShowModal(false)
    }, 3000)
    
  }, [setShowModal, showModal])

  return (
  <>
  {showModal ? (
    <Background >
          <ModalContent>
            <h1>Dados salvos com sucesso!</h1>
          </ModalContent>
    </Background>
  ) : null}
  </>
  );
}