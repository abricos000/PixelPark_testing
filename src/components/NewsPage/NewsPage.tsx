import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../loader/Loader'
import newsPageStore from '../Store/newsPageStore'
import CommentItem from './Comment/CommentItem'
import Story from './Story/Story'
import style from './newsPage.module.css'



// interface IStory {
//   by: string
//   descendants: number
//   id: number
//   kids: number[]
//   score: number
//   time: number
//   title: string
//   type: string
//   url: string
// }


// interface IComment {
//   deleted: boolean
//   text: string
//   by: string
//   descendants: number
//   id: number
//   kids: number[] 
//   st: boolean
//   score: number
//   time: number
//   title: string
//   type: string
//   children: IComment[]
// }


const NewsPage = observer (() => {

  const {id} = useParams()

  const {status, comments, error}  = newsPageStore

  useEffect(() => {
    newsPageStore.getCommentsById(Number(id))
  }, [id])

  if (error) {
    return <div style={{color: '#fff'}}> Произошла ошибка</div>
  } 

  if (!status) {
    return <Loader/>
  }

  return (
    <>
      <Story story={newsPageStore.story}/>

      <button className={style.upDate} onClick={() => newsPageStore.getCommentsById(Number(id))}>UpDate Comment</button>

      {comments.map(el => <CommentItem key={el.id} comment={el} />)}

    </>
  )
})

export default NewsPage