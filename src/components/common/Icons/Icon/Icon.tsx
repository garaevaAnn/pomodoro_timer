
import React from 'react';
import { CrossDelete } from '../CrossDelete';
import { Delete } from '../Delete';
import { Edit } from '../Edit';
import { Minus } from '../Minus';
import { Plus } from '../Plus';
import { PomodoroLogo } from '../PomodoroLogo';
import { Statistics } from '../Statistics';


export enum EIcons {
  logo = 'Logo',
  staristics = 'staristics',
  plus = 'plus',
  minus = 'minus',
  edit = 'edit',
  delete = 'delete',
  crossDelete = 'crossDelete',
}


export interface IIconProps {
  name: EIcons;
  className?: string;
}

export function Icon(props:IIconProps) {
  return (
   svgForBlock(props)
  );
}


function svgForBlock(props:IIconProps) {
  switch(props.name){
    case EIcons.logo:
      return <PomodoroLogo {...props} />
    
    case EIcons.staristics:
      return <Statistics {...props} />  
    case EIcons.plus:
      return <Plus  />
    case EIcons.minus:
    return <Minus  />
    case EIcons.edit:
      return <Edit  />
    case EIcons.delete:
    return <Delete  />
    case EIcons.crossDelete:
      return <CrossDelete  />
    default:
      return <></>
  }
}
