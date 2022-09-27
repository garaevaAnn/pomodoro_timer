import React, { useEffect, useState } from 'react';
import { Dropdown } from '../../../../common/Dropdown';
import styles from './selectorSortInfo.module.css';

type TList = {
  id: number,
  value: string,
  clickMe: () => void
}

export function SelectorSortInfo() {
  const list = [
    { id: 1, value: 'Эта неделя', clickMe: () => { selectChange(1) } },
    { id: 2, value: 'Прошедшая неделя', clickMe: () => { selectChange(2) } },
    { id: 3, value: '2 недели назад', clickMe: () => { selectChange(3) } }]

  const [selectedOption, setSelectedOption] = useState('');
  const [selectList, setSelectList] = useState<TList[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedOption(list[0].value);
    let l = list.slice(1);
    setSelectList(l);
  }, [])

  const selectChange = (id: number) => {
    debugger;
    let value = '';
    let listForSelect = [];
    for (let item of list) {
      if (item.id === id)
        value = item.value
      else
        listForSelect.push(item);
    }
    setSelectedOption(value);
    setSelectList(listForSelect);
    setIsOpen(false);
  };

  const handelClick =() => {
    setIsOpen(!isOpen);
  }
  return (
    <div className={styles.container}>
      <Dropdown
        button={
          <div className={isOpen ? styles.selectOpen : styles.select} onClick={handelClick}>{selectedOption}</div>
        }
        coordsLeftPositionList={0}
      >
        <div className={styles.dropdown}>
          <ul className={styles.list}>
            {
              selectList.map(i => (
                <li className={styles.item} key={i.id} onClick={i.clickMe}  >
                  {i.value}
                </li>
              ))
            }
            {/* <li className={styles.item}>Эта неделя</li>
           <li className={styles.item}>Прошедшая неделя</li>
           <li className={styles.item}>2 недели назад</li> */}
          </ul>
        </div>

      </Dropdown>

    </div>
  );
}

// export function SelectorSortInfo() {
//   const [selectedOption, setSelectedOption] = useState<String>('this');

//   const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const value = event.target.value;
//     setSelectedOption(value);
//   };

//   return (
//     <div className={styles.container}>
//     <select onChange={selectChange} className={styles.select}>
//       <option className={styles.option} value="this">Эта неделя</option>
//       <option className={styles.option} value="next">Прошедшая неделя</option>
//       <option className={styles.option} value="2ago">2 недели назад</option>
//     </select>
//   </div>
//   );
// }
