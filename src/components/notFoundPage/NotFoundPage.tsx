import React from 'react'
import { Link } from 'react-router-dom'
import style from './notFoundPage.module.css'

const NotFoundPage = () => (

  <div className={style.text}> 
    Nothing found, go to main 
    {' '}
    <Link to={'/'}>page</Link>

    
  </div>
)

export default NotFoundPage;
