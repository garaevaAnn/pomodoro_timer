import React from 'react';
import { Dropdown } from '../../../../common/Dropdown';
import { MenuIcon } from '../../../../common/Icons/MenuIcon';
import { DropMenu } from '../DropMenu';
import styles from './menu.module.css';

export interface IDropMenu {
  onMinus? : () => void,
  onPlus? : () => void,
  onEdit? : () => void,
  onDelete? : () => void,
}

export function Menu(props : IDropMenu) {
  return (
    <div className={styles.menu}>
      <Dropdown
       button={
        <button className={styles.menuButton}>
         <MenuIcon /> 
        </button>
        }
        >
        <div className={styles.dropdown}>
         <DropMenu {...props}/>
        </div>
      </Dropdown>
    </div>
  );
}
