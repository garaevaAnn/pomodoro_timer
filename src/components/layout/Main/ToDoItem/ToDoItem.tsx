
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { timerSettings } from '../../../../App';
import { Icon, EIcons } from '../../../common/Icons/Icon';
import { Todo } from '../../../../types/types';
import { IDropMenu, Menu } from './Menu';
import { ModalDelete } from './ModalDelete';
import styles from './todoitem.module.css';
import { setLocalStorage } from '../../../../hooks/setLocalStorage';
import { todoListState, focusTask } from '../../../../types/recoilStates';

export function ToDoItem(props: Todo) {

  const [editTask, setEditTask] = useState(props.task);
  const ref = useRef<HTMLInputElement>(null);
  const refDiv = useRef<HTMLDivElement>(null);
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const setFocusTask = useSetRecoilState(focusTask);
  const [isDelete, setIsDelete] = useState(false);
  const [pomodoros, setPomodores] = useState<number[]>([]);
  const settings = useRecoilValue(timerSettings);

  useEffect(() => {
    let pomodor = [];
    for (let i = 0; i <= props.pomodoro.countCompleted - 1; i++) {
      pomodor.push(i + 1);
    }
    setPomodores(pomodor);
  }, [props.pomodoro.countCompleted]);

  function focusItem() {
    setFocusTask(props)
  }

  const inputEdit = (event: ChangeEvent<HTMLInputElement>) => {
    setEditTask(event.target.value)
  }

  const questionDelete = () => {
    setIsDelete(true);
  };

  const deleteItem = () => {
    setTodoList(todoList.filter((todo) => {
      if (todo.id !== props.id) return true;
      else {
        setLocalStorage({ key: 'todoList', value: todo , delete : true});
        return false;
      }
    }));
    //  setTodoList((oldTodoList) => {
    //   const newTodoList = oldTodoList.filter((todo) => todo.id !== props.id)

    //   setLocalStorage({ key: 'todoList', value: newTodoList});
    //   return newTodoList;
    // });
  };

  const cencelDelete = () => {
    setIsDelete(false);
  };

  const addPomodoro = () => {
    // setTodoList(
    //   todoList.map((todo) => {
    //     if (todo.id === props.id) {
    //       return toggelPomodoro(true, todo);
    //     }
    //     return todo;
    //   })); 
    setTodoList((oldTodoList) => {
      const newTodoList = oldTodoList.map((t) => {
        if (t.id === props.id) {
          let todo = toggelPomodoro(true, t);
          setLocalStorage({ key: 'todoList', value: todo });
          return todo;
        }
        return t;
      });

      return newTodoList;
    });

    refDiv.current?.focus();
  };

  const deletePomodoro = () => {
    if (props.pomodoro.countPomodore === 1)
      return
    setTodoList((oldTodoList) => {
      const newTodoList = oldTodoList.map((t) => {
        if (t.id === props.id) {
          let todo = toggelPomodoro(false, t);
          setLocalStorage({ key: 'todoList', value: todo });
          return todo;
        }
        return t;
      });
      return newTodoList;
    });
  };

  function toggelPomodoro(isAdd: boolean, todo: Todo) {
    const min = [...todo.pomodoro.seconden];
    if (isAdd) {
      min.push(settings.second);
    }
    else {
      min.splice(min.length - 1, 1);
    }
    return {
      ...todo,
      pomodoro: {
        ...todo.pomodoro,
        seconden: min,
        countPomodore: isAdd ? props.pomodoro.countPomodore + 1 : props.pomodoro.countPomodore - 1
      }
    };
  }

  const blur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.disabled = true;

    // setTodoList((oldTodoList) => {
    //   const newTodoList = oldTodoList.map((t) => {
    //     if (t.id === props.id) {
    //       let todo = {
    //         ...t,
    //         task: event.target.value.trim(),
    //       };
    //       setLocalStorage({ key: 'todoList', value: todo});
    //       return todo;
    //     }
    //     return t;
    //   });
    //   return newTodoList;
    // });

    setTodoList(
      todoList.map((t) => {
        if (t.id === props.id) {
          let todo = {
            ...t,
            task: event.target.value.trim(),
          };
          setLocalStorage({ key: 'todoList', value: todo });
          return todo;
        }
        return t;
      })
    );
  };

  const editTodo = () => {
    const input = document.getElementById(`${props.id}`);
    if (input) {
      input.removeAttribute("disabled");
      ref.current?.focus();
    }
  }

  const menuProps: IDropMenu = {
    onPlus: addPomodoro,
    onMinus: deletePomodoro,
    onEdit: editTodo,
    onDelete: questionDelete
  }


  return (
    <div className={styles.itodoItem} onClick={focusItem} tabIndex={0} ref={refDiv}>
      <div>
        <span className={styles.pomodoroCount}>{props.pomodoro.countPomodore}</span>
        {/* <span className={styles.name}>{props.task}</span> */}
        <input
          ref={ref}
          id={`${props.id}`}
          className={styles.inputName}
          value={editTask}
          tabIndex={-1}
          onChange={inputEdit}
          onBlur={blur}
          disabled
        // aria-invalid = {valueError ? 'true' : undefined}
        />
        <span>{pomodoros.map(i => (
          <Icon key={i} name={EIcons.logo} className={styles.pomodoro} />
        )
        )}</span>
      </div>
      <Menu {...menuProps} />
      {isDelete && <ModalDelete onCencel={cencelDelete} onDelete={deleteItem} />}
    </div>
  );
}

