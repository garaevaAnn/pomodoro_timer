import React from 'react';
import { useRecoilValue } from 'recoil';
import { focusTask } from '../../../../../../types/recoilStates';
import { EColors } from '../../TimerContainer';
import styles from './timerButtons.module.css';

export interface IBtns {
  onClickBtn1 : () => void;
  onClickBtn2 : () => void;
  nameBtn1 : string,
  nameBtn2 : string,
  isDisabled : boolean,
  isPaused : boolean
}

export function TimerButtons(props: IBtns) {
  const todoIsFocus = useRecoilValue(focusTask);
  return (
    <div className={styles.btns} >
    <button className={styles.startbtn} onClick={props.onClickBtn1} disabled={todoIsFocus.id ? false : true}>
      {props.nameBtn1}
    </button>
    {!props.isDisabled ? 
    (<button className={styles.stopbtn}
      style={props.isPaused ? {backgroundColor: EColors.red , color : EColors.white} : {backgroundColor: 'transparent'}}
       onClick={props.onClickBtn2}>{props.nameBtn2}</button>) :
    <button className={styles.stopbtn} disabled >Стоп</button>}
  </div>
  );
}
