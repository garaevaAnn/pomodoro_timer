
import * as React from 'react'
import styles from './header.module.css'
import { Link } from 'react-router-dom';
import { Icon, EIcons } from '../../common/Icons/Icon';


export function Header() {
  return (
    <header className={styles.header}>
      <div style={{ display: 'flex' }}>
        <Icon name={EIcons.logo} />
        <span className={styles.text}>pomodoro_box</span>
      </div>
      <Link to="/statistics">
        <Icon name={EIcons.staristics} className={styles.icon} />
        <span className={styles.statistics}>Статистика</span>
      </Link>
      {/* <a className={styles.link} href="# ">
      <Icon name={EIcons.staristics} className={styles.icon} />
      <span className={styles.statistics}>Статистика</span>
     </a> */}
    </header>
  )
}

