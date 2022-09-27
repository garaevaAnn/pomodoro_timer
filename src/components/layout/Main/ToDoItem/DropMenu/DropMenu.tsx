import React from 'react';
import { Icon, EIcons } from '../../../../common/Icons/Icon';
import { IDropMenu } from '../Menu';
import styles from './dropmenu.module.css';


export function DropMenu(props : IDropMenu) {
  return (
    <ul className={styles.dropMenu}>
      <li className={styles.dropItem} onClick={props.onPlus}>
        <Icon name={EIcons.plus}/>
        <span className={styles.dropText}>Увеличить</span>
      </li>
      <li className={styles.dropItem} onClick={props.onMinus}>
        <Icon name={EIcons.minus}/>
        <span className={styles.dropText}>Уменьшить</span>
      </li>
      <li className={styles.dropItem} onClick={props.onEdit}>
        <Icon name={EIcons.edit}/>
        <span className={styles.dropText}>Редактировать</span>
      </li>
      <li className={styles.dropItem} onClick={props.onDelete}>
        <Icon name={EIcons.delete}/>
        <span className={styles.dropText}>Удалить</span>
      </li>
    </ul>
  );
}
