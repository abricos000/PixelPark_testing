import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'
import newsPageStore from '../../Store/newsPageStore'
import CommentItem from '../Comment/CommentItem'
import Story from '../Story/Story'
import style from './newsPage.module.css'
import NotFoungErrorPage from '../NotFoungErrorPage/NotFoungErrorPage'
import { idRequest } from '../../Types/types'


const NewsPage = observer (() => {

  const {id} = useParams()
  
  const IdNumber = typeof Number(id) === 'number' && !isNaN(Number(id)) ? Number(id) : id

  const {isLoading, commentsTree, error, story}  = newsPageStore

  useEffect(() => {
    newsPageStore.getCommentsById(IdNumber as idRequest)
  }, [IdNumber])

  if (error) {
    return (
      <NotFoungErrorPage 
        click={() => newsPageStore.getCommentsById(Number(id))}
      >
        refresh the page
      </NotFoungErrorPage>
    )
  }

  if (!isLoading) {
    return <Loader/>
  }

  return (
    <>
      <Story story={story}/>

      <button className={style.upDate} onClick={() => newsPageStore.getCommentsById(IdNumber as idRequest)}>
        UpDate Comment
      </button>
      
      {story.kids 
        ? commentsTree.map(el => <CommentItem key={el.id} comment={el} />) 
        : <div className={style.noComment}>no comments</div>
      }

    </>
  )
})

export default NewsPage