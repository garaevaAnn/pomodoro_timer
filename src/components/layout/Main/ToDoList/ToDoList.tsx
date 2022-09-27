import React from 'react';
import { useRecoilValue } from 'recoil';
import { todoListState } from '../../../../types/recoilStates';
import { ToDoItem } from '../ToDoItem';
import styles from './todolist.module.css';


export function ToDoList() {
  const todos = useRecoilValue(todoListState);

  return (
    <ul className={styles.todoList}>
    {todos.map( task => (
      <li className={styles.item} key={task.id}  >
        <ToDoItem {...task}/>
      </li>
      )
     )
    }
    </ul>
  );
}
