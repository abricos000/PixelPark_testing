import React from 'react'
import { Link } from 'react-router-dom'
import { IStory } from '../../../types/types'
import style from './newsItem.module.css'


type Props = {
  story: IStory
}

const NewsItem = ({ story }: Props) => (

  <div className={style.item}>

    <Link to={`/news/${story.id}`} className={style.link}>
      <h2 className={style.title}>{story.title}</h2>
    </Link>

    <div className={style.container}>
      <div className={style.userName}>{story.by}</div>

      <div className={style.userName}>
        {story.timeData}
      </div>
      
      <div className={style.userName}>{story.score}</div>
    </div>
  </div>
)

export default NewsItem

