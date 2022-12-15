//import { Component } from "react";
import style from 'components/Button/Button.module.css'
export const Button = ({ text, clickHandler,loading }) => {
  
  return (
//  Math.ceil(images.totalHits / images.perPage) <= pageNumber
        <button onClick={clickHandler}
      className={style.button}
      visible={loading}
    >
      {text}
    </button> 
)}