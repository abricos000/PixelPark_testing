import { observer } from 'mobx-react'
import newsPageStore from '../../../Store/newsPageStore'
import { IComment } from '../../../types/types'
import style from './commentItem.module.css'


type Props = {
  comment: IComment
}

const CommentItem = observer(({comment}: Props) =>  (

    <div className={!comment.deleted ? style.item : style.delete }>

      <div className={style.text}>
        {comment.deleted ? '***** DELETE COMMENTS *****' : comment.text}
      </div>
      
      <div className={style.time}>
        {comment.timeData}
      </div>

      {comment.kids && 
        <div className={style.wrapperBtn}>
          {`ответа: ${comment.kids.length} |`}
            <button
              className={style.btn}
              onClick={() => newsPageStore.toggleStatus(comment.id)}
            >
              {comment.status ? 'скрыть' : 'показать'}
            </button>
        </div>
      }

      {comment.status && comment?.children.map(el => <CommentItem key={el.id} comment={el} />)}
    </div>
  ))

export default CommentItem