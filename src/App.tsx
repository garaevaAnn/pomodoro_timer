import React, { useEffect } from 'react';
import './App.css';
import {
  atom,
  RecoilRoot,
  useSetRecoilState
} from 'recoil';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useLocalStorage } from './hooks/useLocalStorage';
import { todoListState } from './types/recoilStates';
import { IUseLocalStorageProps, Todo } from './types/types';
import { Header } from './components/layout/Header';
import { Statistics } from './components/layout/Statistics';
import { Main } from './components/layout/Main';

export const timerSettings = atom({
  key: 'timerSettings',
  default: {
    second: 10,  // храним в секундах
    kortPause: 5,
    longPause: 15
  } as TimerSettings,
});

type TimerSettings = {
  second: number,
  kortPause: number,
  longPause: number
}


function AppComponent() {

  const initLocal: IUseLocalStorageProps = { key: 'todoList' }
  const localTodoList = useLocalStorage(initLocal);
  const setTodos = useSetRecoilState(todoListState);

  let today = new Date();
  today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  function chackDate(todo: Todo) {
    let date = new Date(todo.dataCreate);
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    if (date.toString() === today.toString())
      return true;
    else
      return false;
  }
  useEffect(() => {
    const allTodo: Todo[] = localTodoList;
    const notComplitedTodoNotToday = allTodo.filter((todo) => (!todo.isCompleted && !chackDate(todo)));
    const todayTodo = allTodo.filter((todo) => chackDate(todo));
    const completedTodayTodo = todayTodo.filter((todo) => todo.isCompleted);
    const notCompletedTodayTodo = todayTodo.filter((todo) => !todo.isCompleted);
    setTodos(completedTodayTodo.concat(notComplitedTodoNotToday.concat(notCompletedTodayTodo)));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Main />} />
          <Route path="statistics" element={<Statistics />} />
        </Routes>

      </ BrowserRouter>
    </div>
  );
}

function App() {
  return (
    <RecoilRoot>
      <AppComponent />
    </RecoilRoot>
  );
}

export default App;
