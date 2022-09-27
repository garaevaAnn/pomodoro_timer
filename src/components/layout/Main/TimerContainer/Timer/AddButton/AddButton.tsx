import React from 'react';
import styles from './addbutton.module.css';

interface IAddButton {
  handleClick : () => void;
}

export function AddButton({handleClick}:IAddButton ) {
  return (
    <span className={styles.add} onClick={handleClick}></span>
  );
}
