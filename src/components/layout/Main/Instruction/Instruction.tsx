import React from 'react';
import styles from './instruction.module.css';

export function Instruction() {
  return (
  <div className={styles.instructions}>
    <h2>
      Ура! Теперь можно начать работать:
    </h2>
    <ul className={styles.list}>
      <li className={styles.item}>
        <span className={styles.text}>Выберите категорию и напишите название текущей задачи</span>
        </li>
      <li className={styles.item}>
        <span className={styles.text}>Запустите таймер («помидор»)</span>
        </li>
      <li className={styles.item}>
         <span className={styles.text}>Работайте пока «помидор» не прозвонит</span>
         </li>
      <li className={styles.item}>
        <span className={styles.text}> Сделайте короткий перерыв (3-5 минут)</span>
        </li>
      <li className={styles.item}>
        <span className={styles.text}>Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).</span>
      </li>
    </ul>
  </div>
  );
}
