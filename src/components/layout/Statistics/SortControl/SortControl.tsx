import React from 'react';
import { SelectorSortInfo } from './SelectorSortInfo';
import styles from './sortcontrol.module.css';

export function SortControl() {
  return (
    <div className={styles.sortControl}>
      <h3 style={{margin: '0' }}>Ваша активность</h3>
       < SelectorSortInfo />
    </div>
  );
}
