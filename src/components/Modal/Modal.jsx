import {useEffect} from "react";
//import { createPortal } from "react-dom";
import style from 'components/Modal/Modal.module.css'

//const modalRoot = document.querySelector('#modal-root')
export const Modal=({ children,onClose})=>{
  useEffect(() => {
    const modalKeyDown = ({ code }) => {
      if (code === 'Escape') {
       onClose();
      }
       window.addEventListener('keydown', modalKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', modalKeyDown)
    }
  }, [onClose]) 
     

   const handleClickBackdrop = e => {
      if (e.currentTarget === e.target) {
     onClose();
    }
     
    }



    //const { children} = this.props;
    
      return( 
        
          < div className={style.Overlay}
            // onClick={closeModal}
          //ref={this.modalKeyDown()}
            onClick={handleClickBackdrop}
          >
            <div 
              className={style.Modal} >
            { children}
    
            </div>
          </div >
      )
               }
  

