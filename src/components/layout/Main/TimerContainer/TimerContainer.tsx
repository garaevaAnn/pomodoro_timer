import  { useEffect, useState } from 'react';
import {  useRecoilState, useRecoilValue } from 'recoil';
import { timerSettings } from '../../../../App';
import { setLocalStorage } from '../../../../hooks/setLocalStorage';
import { todoListState, initTimeTimer, isTimerStart, focusTask } from '../../../../types/recoilStates';
import { ITimer } from '../../../../types/types';
import { HeaderTimer } from './HeaderTimer';
import { Timer } from './Timer';
import styles from './timerContainer.module.css';

interface ITimerContainer {
  name?: string
}

export enum EColors {
  red = '#DC3E22',
  green = '#A8B64F',
  gray = '#C4C4C4',
  black = '#333333',
  white = '#FFFFFF'
}


type TNextPomodore = {
  idPreviousPomodoro: number,
  name: string,
  time: number,
  leftPomodore: number,
  numberTodo: number
}

export function TimerContainer({ name }: ITimerContainer) {

  const settings = useRecoilValue(timerSettings);
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [initTime, setInitTime] = useRecoilState(initTimeTimer);
  const [isStarted, setIsStarted] = useRecoilState(isTimerStart);
  const focusTodo = useRecoilValue(focusTask);

  const [wieNextTimer, setWieNextTimer] = useState<TNextPomodore | null>(null);

  const [needToTick, setNeedToTick] = useState(0);
  const [nameRunenTimer, setNameRunenTimer] = useState('');
  const [pauseCount, setPauseCount] = useState(0);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [pauseTime, setPauseTime] = useState(false);
  const [headerColor, setHeaderColor] = useState(EColors.gray);
  const [timerColor, setTimerColor] = useState(EColors.black)


  useEffect(() => {
    setNameRunenTimer(name ? name : '');
  }, [name]);

  useEffect(() => {
    setNeedToTick(initTime)
  }, [initTime]);


  useEffect(() => {
    if (!wieNextTimer && isStarted)
      setWieNextTimer(whoseNextTimer());
  }, [todoList]);

  useEffect(() => {
    if (pauseTime) {
      setHeaderColor(EColors.green);
      setTimerColor(EColors.green)
    }
    else if (isStarted) {
      setHeaderColor(EColors.red);
      setTimerColor(EColors.red)
    }

  }, [pauseTime]);

  function whoseNextTimer() {
    let idPreviousPomodoro = 0;
    let name = '';
    let time = 0;
    let leftPomodore = 0;
    let numberTodo = 0;
    if (!wieNextTimer) {
      const arrIsCompleted = todoList.filter((todo) => todo.isCompleted);
      const arr = todoList.filter((todo) => !todo.isCompleted);
      if (arr.length > 0 && arr[0].pomodoro.countPomodore > 1) {
        idPreviousPomodoro = arr[0].id;
        name = arr[0].task;
        time = arr[0].pomodoro.seconden[1];
        leftPomodore = arr[0].pomodoro.countPomodore - 2;
        numberTodo = arrIsCompleted.length
      }
      else if (arr[1]) {
        idPreviousPomodoro = arr[0].id;
        name = arr[1].task;
        time = arr[1].pomodoro.seconden[arr[1].pomodoro.countCompleted];
        leftPomodore = arr[1].pomodoro.countPomodore - arr[1].pomodoro.countCompleted - 1;
        numberTodo = arrIsCompleted.length + 1;
      }
      else
        return null;
    }
    else {
      if (wieNextTimer.leftPomodore > 0) {
        let num = wieNextTimer.numberTodo;
        idPreviousPomodoro = todoList[num].id;
        name = todoList[num].task;
        time = todoList[num].pomodoro.seconden[todoList[num].pomodoro.countPomodore - wieNextTimer.leftPomodore];
        leftPomodore = wieNextTimer.leftPomodore - 1;
        numberTodo = num;
      }

      else {
        let num = wieNextTimer.numberTodo + 1;
        if (todoList[num]) {
          idPreviousPomodoro = todoList[wieNextTimer.numberTodo].id
          name = todoList[num].task;
          time = todoList[num].pomodoro.seconden[todoList[num].pomodoro.countCompleted];
          leftPomodore = todoList[num].pomodoro.countPomodore - todoList[num].pomodoro.countCompleted - 1;
          numberTodo = num;
        }
        else return null;
      }

    }

    return { idPreviousPomodoro, name, time, leftPomodore, numberTodo }
  }

  function initStartTimer() {
    let count = 0;
    for (const todo of todoList) {
      if(!todo.isCompleted)
        count += todo.pomodoro.countPomodore - todo.pomodoro.countCompleted;
    }
    if (count > 0) {
      if (focusTodo.id !== todoList[0].id) {

        const arr1 = todoList.filter((todo) => todo.isCompleted);
        const arr2 = todoList.filter((todo) => (todo.id !== focusTodo.id && !todo.isCompleted));
        arr2.unshift(focusTodo); 
        setTodoList(arr1.concat(arr2));

      }
      else
        setWieNextTimer(whoseNextTimer());
      setIsStarted(true);
      setHeaderColor(EColors.red);
      setTimerColor(EColors.red);
      setPomodoroCount(count);
      // setWieNextTimer(whoseNextTimer());
    }
  }

  const startTimer = () => {
    if (!focusTodo.id) return;
    if (!isStarted) {
      initStartTimer();
    }
    else if (pomodoroCount !== 0) {

      const newMin = pauseTime ? wieNextTimer?.time : (pauseCount !== 0 && pauseCount % 3 === 0) ? settings.longPause : settings.kortPause;
      if (pauseTime) {
        setPauseCount(pauseCount + 1);
        setWieNextTimer(whoseNextTimer());
      }
      else {
        setPomodoroCount(pomodoroCount - 1);
        donePomodoro();
      }

      setNeedToTick(newMin ? newMin : 0);
      setNameRunenTimer(!pauseTime ? nameRunenTimer : wieNextTimer ? wieNextTimer.name : nameRunenTimer)
      setPauseTime(!pauseTime);
    }
    else {
      debugger;
      setIsStarted(false);
      setPauseTime(false);
      setHeaderColor(EColors.gray);
    }

  }

  const stopTimer = () => {
    setHeaderColor(EColors.gray);
    setWieNextTimer(null);
    setPauseCount(0);
  }

  const donePomodoro = () => {
    let todo = todoList[todoList.length - 1];
    let isCompleted = false;
    let count = 0;
    
    if (wieNextTimer) {
      for (let t of todoList) {
        if (t.id === wieNextTimer.idPreviousPomodoro)
          todo = t;
      }
    }

    count = todo.pomodoro.countCompleted + 1;
    if (count === todo.pomodoro.countPomodore)
      isCompleted = true;

      // setTodoList((oldTodoList) => {
      //   const newTodoList = oldTodoList.map((t) => {
      //     if (t.id === todo.id) {

      //       return {
      //         ...t,
      //         isCompleted: isCompleted,
      //         dateDone : isCompleted ?  new Date() : null,
      //         pomodoro: {
      //           ...t.pomodoro,
      //           countCompleted: count
      //         },
      //       };
      //     }
      //     return t;
      //   });
      //   setLocalStorage({ key: 'todoList', value: newTodoList});
      //   return newTodoList;
      // });
      
    setTodoList(
      todoList.map((t) => {
        if (t.id === todo.id) {
          let newT = {
            ...t,
            isCompleted: isCompleted,
            dateDone : isCompleted ?  new Date() : null,
            pomodoro: {
              ...t.pomodoro,
              countCompleted: count
            }
          };
          setLocalStorage({ key: 'todoList', value: newT});
          return newT;
        }
        return t;
      })
    );

  }

  const onAddClick = () => {
    if (!isStarted) {
      setInitTime(initTime + 60);
    }
  }

  const timerProps: ITimer = {
    needToTick: needToTick,
    nameTask: nameRunenTimer,
    onAddClick: onAddClick,
    startTimer: startTimer,
    stopTimer: stopTimer,
    color: timerColor,
    pauseTime: pauseTime
  };

  return (
    <div className={styles.timerForm}>
      <HeaderTimer name={nameRunenTimer} color={headerColor} />
      <Timer {...timerProps} />
    </div>
  );
}
