import React from 'react';
import styles from './headertimer.module.css';

interface ITimer {
  name?:string,
  color : string,
}

export function HeaderTimer({name , color}: ITimer) {
 
  return (
    <div className={styles.headerTimer} style={{backgroundColor : `${color}`}}>
      <span >{name ? name : 'Задача'}</span>
      <span >{`Помидор 1}`}</span>
  </div>
  );
}
