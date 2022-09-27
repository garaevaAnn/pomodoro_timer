export interface IUseLocalStorageProps {
    key:string,
    value?: Todo,
    delete?: boolean,
  }
  
export type Todo = {
    id: number;
    dataCreate : Date;
    dateDone : Date | null;
    task: string;
    isCompleted: boolean;
    pomodoro: TPomodoro
};

type TPomodoro = {
    seconden: number[];
    countCompleted: number,
    countPomodore: number
}

export interface ITimer {
    needToTick: number,
    nameTask?: string,
    pauseTime: boolean,
    color: string,
    onAddClick: () => void,
    startTimer: () => void,
    stopTimer: () => void
}  

export interface ISvgProps {
    className?: string;
  }