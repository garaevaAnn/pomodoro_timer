import {
    atom,
  } from 'recoil';
import { Todo } from './types';
  
  export const todoListState = atom({
    key: 'TodoList',
    default: [] as Todo[],
  });
  
  export const focusTask = atom({
    key: 'Task',
    default: {} as Todo,
  });
  
  export const initTimeTimer = atom({
    key: 'Time',
    default: 0,
  });
  
  export const isTimerStart = atom({
    key: 'isStartTimer',
    default: false,
  });