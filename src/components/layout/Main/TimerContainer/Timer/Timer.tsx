import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { focusTask, isTimerStart } from '../../../../../types/recoilStates';
import { ITimer } from '../../../../../types/types';
import { EColors } from '../TimerContainer';
import { AddButton } from './AddButton';
import styles from './timer.module.css';
import { IBtns, TimerButtons } from './TimerButtons';

export function Timer({ needToTick, nameTask, color, pauseTime, onAddClick, startTimer, stopTimer }: ITimer) {
  const [intervalId, setIntervalId] = useState(0);
  const [currentTick, setCurrentTick] = useState(0);
  const [time, setTime] = useState('00:00');
  const [isPaused, setIsPaused] = useState(false);
  const [isStarted, setIsStarted] = useRecoilState(isTimerStart);
  const todoIsFocus = useRecoilValue(focusTask);
  
  useEffect(() => {
    setCurrentTick(needToTick);
    setTime(format(needToTick));
    if (isStarted)
      tickTimer();
  }, [needToTick]);


  useEffect(() => {
    if (isStarted) {
      tickTimer();
    }
  }, [isStarted]);

  useEffect(() => {

    setTime(format(currentTick));
    if (currentTick === 0 && intervalId !== 0) {
      clearInterval(intervalId);
      setIntervalId(0);
      startTimer();
    }
  }, [currentTick]);

  const format = (seconds: number) => {
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);
    const timeFormated = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    return timeFormated;
  };

  const tickTimer = () => {
    if (isPaused)
      setIsPaused(false);

    const timerId = setInterval(() => {
      setCurrentTick(prev => prev - 1);
    }, 1000);
    setIntervalId(Number(timerId));

  }

  const onStopTimer = () => {
    clearInterval(intervalId);
    setIsStarted(false);
    setIsPaused(false);
    setCurrentTick(needToTick);
    setIntervalId(0);
    stopTimer();
  }

  const pauseTimer = () => {
    clearInterval(intervalId);
    setIsPaused(true);
  }

  const onDone = () => {
    clearInterval(intervalId);
    setIsPaused(false);
    startTimer();
  }

  const skip = () => {
    setCurrentTick(0);

  }

  const btnsProperty: IBtns = {
    onClickBtn1: isStarted ? (isPaused ? tickTimer : pauseTimer) : startTimer,
    onClickBtn2: pauseTime ? skip : (isPaused ? onDone : onStopTimer),
    nameBtn1: isStarted ? (isPaused ? 'Продолжить' : 'Пауза') : 'Старт',
    nameBtn2: pauseTime ? 'Пропустить' : (isPaused ? 'Сделано' : 'Стоп'),
    isDisabled: !isStarted,
    isPaused: isPaused
  };
  return (
    <div className={styles.pomodoro}>
      <div className={styles.timer} style={{ color: (isPaused || !isStarted) ? EColors.black : color }}>
        {time}
      </div>
      <span className={styles.task}>Задача - {nameTask ? nameTask : ''}</span>
      <TimerButtons {...btnsProperty} />
      {!todoIsFocus.id && (<AddButton handleClick={onAddClick} />)}
    </div>
  );
}
