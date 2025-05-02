import { FC, PropsWithChildren } from 'react';
import style from './style.module.css'

export const URLList: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ul className={style.list}>
      {children}
    </ul>
  )
}