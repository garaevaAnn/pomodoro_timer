import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isTimerStart } from '../../../../types/recoilStates';
import styles from './todoform.module.css';

interface IForm {
  value: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onFocus: () => void;
}

export function ToDoForm({value, onChange , onSubmit , onFocus}:IForm) {
  const isStarted = useRecoilValue(isTimerStart);
  const[valueError, setValueError] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setValueError(validateValue());
    const isFormValid = !validateValue();
    if(!isFormValid) return;

     onSubmit();
  }

  function validateValue() {
    if(value.trim().length === 0) return 'Введите задачу'
    return '';
  }
  return (
  <form className={styles.form} onSubmit={handleSubmit}>
    <input 
    className={styles.input}
    value={value}
    placeholder='Название задачи'
    onChange={onChange}
    onFocus={onFocus}
    aria-invalid = {valueError ? 'true' : undefined}
    disabled={isStarted} 
    />
    {valueError && (<div style={{fontSize: 10 , color: 'red' , textAlign: 'start'}}>{valueError}</div>)}
   
    <button type='submit' className={styles.addbtn} disabled={isStarted} >Добавить</button>
  </form>
);
}

