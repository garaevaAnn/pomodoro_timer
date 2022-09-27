import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './dropdown.module.css';

interface IDropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;//для конторолируемых дропов
  onOpen?: () => void;
  onClose?: () => void;
  coordsLeftPositionList?: number
}

type Coords = {
  left: number;
  top: number;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = () => {};

export function Dropdown({button, children, isOpen, onOpen = NOOP,  onClose =  NOOP , coordsLeftPositionList = 100}: IDropdownProps) {
  const controlRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<Coords | null>(null);

  const getCoords = (): Coords | null => {
    const box = controlRef.current?.getBoundingClientRect();

    if (box) {
      return {
        left: box.left ,
        top: box.top + box.height + window.pageYOffset,
      };
    }

    return null;
  };

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen);
  useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);
  useEffect(() => {
    if(isDropdownOpen)
    {
      const coords = getCoords();
      setCoords(coords);
      onOpen();
    }
    else
      onClose();
  }, [isDropdownOpen]);

  useEffect(() => {
    if(isDropdownOpen === undefined || !isDropdownOpen)
    {
      return;
    }
    function handleClick(event: MouseEvent) {
      if(event.target instanceof Node && !ref.current?.contains(event.target) && !controlRef.current?.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick)
    }

  }, [isDropdownOpen]);


  const handleOpen = () => {

    if (isOpen === undefined)
      setIsDropdownOpen(!isDropdownOpen);

  }

  const ref = useRef<HTMLDivElement>(null);

  const node = document.querySelector('#modal_root');
  if(!node) return null;

  return  (
    <div className={styles.container}>
      <div ref={controlRef} onClick={handleOpen}>
        {button}
      </div>
      { isDropdownOpen && coords && ReactDOM.createPortal((
        // <div  className={styles.listContainer}>
        <div  style={{position: 'absolute',
                  left: `${coords.left + coordsLeftPositionList}px`,
                  top: `${coords.top}px`}}
              ref={ref}    >
          <div  className={styles.list} onClick={() => setIsDropdownOpen(false)}>
             {children}
          </div>
        </div>
      ), node)}
    </div>
  );
}
