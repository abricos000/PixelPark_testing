import React from 'react'
import { Link } from 'react-router-dom'
import style from './newsItem.module.css'


interface INewsItemPropos {
  by: string
  descendants: number
  id: number
  kids: []
  score: number
  time: number
  title: string
  type: string
}


type Props = {
  story: INewsItemPropos
}


const NewsItem = ({ story }: Props) => (

    <div className={style.item}>
      
      <Link to={`/news/${story.id}`} className={style.link}>
        <h2 className={style.title}>{story.title}</h2>
      </Link>

      <div className={style.container}>
        <div className={style.userName}>{story.by}</div>
        <div className={style.userName}>
          {new Date(story.time).toLocaleDateString('en-US')}
        </div>
        <div className={style.userName}>{story.score}</div>
      </div>
    </div>
  )

export default NewsItem

