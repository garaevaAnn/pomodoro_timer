import { IUseLocalStorageProps, Todo } from "../types/types";


export function setLocalStorage(props : IUseLocalStorageProps) {
    debugger;
  
  try {
    if(!props.value) return;
    const item = localStorage.getItem(props.key);
    const allTodo :Todo[] | null = item ? JSON.parse(item) : null;
    let newTodos= [];
    let isChange = false;
    if(allTodo) {
      // if(props.delete)
      // {
      //   let id = props.value.id;
      //   newTodos = { ...allTodo.filter((todo) => (todo.id !== id))} as any[];
      // }
      for(let todo of allTodo)
      {
        if(todo.id === props.value.id)
         { 
          isChange = true;
          if(!props.delete){
           newTodos.push(props.value);
          }
          }
        else
          newTodos.push(todo);

      }
      if(!isChange) {
        newTodos.push(props.value);
      }
    }  

    localStorage.setItem(props.key, JSON.stringify(newTodos));
  } catch (error) {
    console.log(error);
  }
};

const test = [
  {
    "id": 1655812662197,
    "dataCreate": "2022-06-21T11:57:42.197Z",
    "dateDone": null,
    "task": "dsds",
    "isCompleted": false,
    "pomodoro": {
      "seconden": [
        10
      ],
      "countCompleted": 0,
      "countPomodore": 1
    }
  },
  {
    "id": 1655812669893,
    "dataCreate": "2022-06-21T11:57:49.893Z",
    "dateDone": null,
    "task": "adsa",
    "isCompleted": false,
    "pomodoro": {
      "seconden": [
        10
      ],
      "countCompleted": 0,
      "countPomodore": 1
    }
  },
  {
    "id": 1655812662666,
    "dataCreate": "2022-06-20T11:57:42.197Z",
    "dateDone": "2022-06-20T11:57:42.197Z",
    "task": "dsds",
    "isCompleted": true,
    "pomodoro": {
      "seconden": [
        10
      ],
      "countCompleted": 1,
      "countPomodore": 1
    }
  },
  {
    "id": 1655812669234,
    "dataCreate": "2022-06-20T11:57:49.893Z",
    "dateDone": null,
    "task": "adsa",
    "isCompleted": false,
    "pomodoro": {
      "seconden": [
        10
      ],
      "countCompleted": 0,
      "countPomodore": 1
    }
  },
  
  {
    "id": 1225812662197,
    "dataCreate": "2022-06-19T11:57:42.197Z",
    "dateDone": null,
    "task": "dsds",
    "isCompleted": false,
    "pomodoro": {
      "seconden": [
        10
      ],
      "countCompleted": 0,
      "countPomodore": 1
    }
  },
  {
    "id": 1633312669893,
    "dataCreate": "2022-06-19T11:57:49.893Z",
    "dateDone": null,
    "task": "adsa",
    "isCompleted": false,
    "pomodoro": {
      "seconden": [
        10
      ],
      "countCompleted": 0,
      "countPomodore": 1
    }
  },
  {
    "id": 1655815562666,
    "dataCreate": "2022-06-19T11:57:42.197Z",
    "dateDone": "2022-06-20T11:57:42.197Z",
    "task": "dsds",
    "isCompleted": true,
    "pomodoro": {
      "seconden": [
        10
      ],
      "countCompleted": 1,
      "countPomodore": 1
    }
  },
  {
    "id": 1655812999234,
    "dataCreate": "2022-06-19T11:57:49.893Z",
    "dateDone": null,
    "task": "adsa",
    "isCompleted": false,
    "pomodoro": {
      "seconden": [
        10
      ],
      "countCompleted": 0,
      "countPomodore": 1
    }
  }
]
