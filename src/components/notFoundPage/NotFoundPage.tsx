import React from 'react'
import { Link } from 'react-router-dom'
import style from './notFoundPage.module.css'

const NotFoundPage = () => (

  <div className='main__content'>Страницы не существует, перейти на главную  
    {' '}
    <Link to={'/'}>страницу</Link>

    
  </div>
)

export default NotFoundPage;
