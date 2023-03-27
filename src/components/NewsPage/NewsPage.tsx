import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../loader/Loader'
import newsPageStore from '../../Store/newsPageStore'
import CommentItem from './Comment/CommentItem'
import Story from './Story/Story'
import style from './newsPage.module.css'
import NotFoungErrorPage from '../NotFoungErrorPage/NotFoungErrorPage'



const NewsPage = observer (() => {

  const {id} = useParams()

  const {isLoading, commentsTree, error, story, comments}  = newsPageStore

  useEffect(() => {
    newsPageStore.getCommentsById(Number(id))
  }, [id])


  if (error || comments[0]?.error) {
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

      <button className={style.upDate} onClick={() => newsPageStore.getCommentsById(Number(id))}>
        UpDate Comment
      </button>



      {story.kids 
        ? commentsTree.map(el => <CommentItem key={el.id} comment={el} />) 
        : <div className={style.noComment}>комментариев нет </div>
      }

    </>
  )
})

export default NewsPage