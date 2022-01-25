import React, { useEffect } from "react";
import { Background, ModalContent } from './styles';

export const ModalConfirm = ({showModal, setShowModal, message}) => {
  
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
            <h1>{message}</h1>
          </ModalContent>
    </Background>
  ) : null}
  </>
  );
}