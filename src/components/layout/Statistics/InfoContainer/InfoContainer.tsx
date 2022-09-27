import React from 'react';
import { GraphContainer } from '../GraphContainer';
import styles from './infocontainer.module.css';

export function InfoContainer() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.day}>Суббота</div>
          <div className={styles.pompdoro}> </div>
        </div>
        <div className={styles.graph}>
          <GraphContainer />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.focus}>
          <span>Фокус</span>
          <span className={styles.text}>0 %</span>
        </div>
        <div className={styles.pauseTime}>
          <span>Время на паузе</span>
          <span className={styles.text}>0 м</span>
        </div>
        <div className={styles.stops}>
          <span>Остановки</span>
          <span className={styles.text}>0</span>
        </div>
      </div>
    </div>
  );
}
