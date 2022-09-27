import React from 'react';
import ReactDOM from 'react-dom';
import { EIcons, Icon } from '../../../../common/Icons/Icon';
import styles from './modaldelete.module.css';

interface IModalDelete {
  onCencel: () => void,
  onDelete: () => void
}

export function ModalDelete({onCencel , onDelete}:IModalDelete) {
  const node = document.querySelector('#modal_root');
  if(!node) return null;
  return ReactDOM.createPortal((
    <div className={styles.overlay}>
    <div className={styles.modal}>
     <div style={{textAlign: 'center', position: 'relative', padding: '0 84px'}}>
     <h3>Удалить задачу?</h3>
      <button className={styles.iconClose}  onClick={onCencel} >{<Icon name={EIcons.crossDelete}/>}</button>
     </div>
      <button className={styles.deleteBtn}  onClick={onDelete} >Удалить</button>
      <button className={styles.cencel}  onClick={onCencel} >Отмена</button>
    </div>
    </div>
  ), node);
}
