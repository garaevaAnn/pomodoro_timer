import React from 'react';
import { InfoContainer } from './InfoContainer';
import { SortControl } from './SortControl';
import styles from './statistics.module.css';

export function Statistics() {
  return (
   <div className={styles.statistics}>
     <SortControl />
     <InfoContainer />
   </div>
  );
}
