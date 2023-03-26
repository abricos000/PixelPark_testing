import { observer } from 'mobx-react'
import newsPageStore from '../../Store/newsPageStore'
import style from './commentItem.module.css'



interface IComment {
  deleted: boolean
  text: string
  by: string
  descendants: number
  id: number
  kids: number[] 
  st: boolean
  score: number
  time: number
  title: string
  type: string
  children: IComment[]
}

type Props = {
  comment: IComment
}

const CommentItem = observer(({comment}: Props) =>  (

    <div className={!comment.deleted ? style.item : style.delete }>
      <div className={style.text}>
        {comment.deleted ? '***** комментарий был удален *****' : comment.text}
      </div>

      {comment.kids &&
        <div>
          <button
            className={style.btn}
            onClick={() => newsPageStore.toggleStatus(comment.id)}
          >
            {comment.kids && `ответ ${comment.kids.length}`}
          </button>
        </div>}

      {comment.st && comment?.children.map(el => <CommentItem key={el.id} comment={el} />)}

    </div>
  ))

export default CommentItem