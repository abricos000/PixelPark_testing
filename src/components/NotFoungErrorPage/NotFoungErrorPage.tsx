import React from 'react'
import style from './notFoungErrorPage.module.css'


type Props = {
    click: () => void
    children: string
}

const NotFoungErrorPage = ({click, children}: Props) => (
    <div className={style.section}>
        <div className={style.text}>
        An error has occurred :(((
            {' '} 
        <button className={style.btn} onClick={click}>{children}</button>
        </div>
    </div>
  )

export default NotFoungErrorPage