import React, { ChangeEvent, useEffect, useState } from 'react';
import { ToDoForm } from './ToDoForm';
import { Instruction } from './Instruction';
import styles from './main.module.css';
import { TimerContainer } from './TimerContainer/TimerContainer';
import { ToDoList } from './ToDoList';
import { useRecoilState, useRecoilValue } from 'recoil';
import { timerSettings } from '../../../App';
import { setLocalStorage } from '../../../hooks/setLocalStorage';
import { initTimeTimer, todoListState, focusTask, isTimerStart } from '../../../types/recoilStates';
import { Todo } from '../../../types/types';


export function Main() {
  const [addedtask, setAddedTask] = useState('');
  const [timertask, setTemerTask] = useState('');
  const [timeTimer, setTimeTimer] = useRecoilState(initTimeTimer);
  const [todos, setTodos] = useRecoilState(todoListState);
  const [focusTodo, setFocusTodo] = useRecoilState(focusTask);
  const settings = useRecoilValue(timerSettings);
  const isStarted = useRecoilValue(isTimerStart);

  useEffect(() => {
    if (focusTodo.id) {
      if (!isStarted) setTemerTask(focusTodo.task);
      if (focusTodo.isCompleted) {
        setTimeTimer(0);
        return;
      }
      setTimeTimer(focusTodo.pomodoro.seconden[focusTodo.pomodoro.countCompleted]);
    }
    else {
      setTemerTask('');
      setTimeTimer(0);
    }
  }, [focusTodo])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setAddedTask(event.target.value);
    setTemerTask(event.target.value)
    if (timeTimer === 0)//|| timeTimer > 25
      setTimeTimer(settings.second);
  }

  function handleSubmit() {
    const todo: Todo = {
      id: Date.now(),
      dataCreate: new Date(),
      dateDone: null,
      task: addedtask,
      isCompleted: false,
      pomodoro: {
        seconden: [timeTimer],
        countCompleted: 0,
        countPomodore: 1
      }
    };

    setTodos([...todos, todo]);
    setAddedTask("");
    setTemerTask('');
    setTimeTimer(0);
    console.log(todos);
    
    setLocalStorage({ key: 'todoList', value: todo});
  }

  function handleFocus() {
    setFocusTodo({} as Todo)
  };

  return (
    <main className={styles.main}>
      <div style={{ marginRight: 25 }}>
        <Instruction />
        <ToDoForm value={addedtask} onChange={handleChange} onSubmit={handleSubmit} onFocus={handleFocus} />
        <ToDoList />
      </div>
      <TimerContainer name={timertask} />
    </main>
  );
}


