import { IUseLocalStorageProps } from "../types/types";


export function useLocalStorage({key} : IUseLocalStorageProps) {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };


 