import { observer } from 'mobx-react'
import newsPageStore from '../../Store/newsPageStore'
import { IComment } from '../../Types/types'
import { timeConverter } from '../../Utils/time-translation'
import style from './commentItem.module.css'


type Props = {
  comment: IComment
}

const CommentItem = observer(({comment}: Props) =>  (

    <div className={!comment.deleted ? style.item : style.delete }>

      <div className={style.text}>
        {comment.deleted ? '***** DELETED COMMENT *****' : comment.text}
      </div>
      
      <div className={style.time}>
        {timeConverter(comment.time)}
      </div>

      {comment.kids && 
        <div className={style.wrapperBtn}>
          {`response: ${comment.kids.length} |`}
            <button
              className={style.btn}
              onClick={() => newsPageStore.toggleStatus(comment.id)}
            >
              {comment.isExpanded ? 'hide' : 'show'}
            </button>
        </div>
      }

      {comment.isExpanded && comment?.children.map(el => <CommentItem key={el.id} comment={el} />)}
    </div>
))

export default CommentItem