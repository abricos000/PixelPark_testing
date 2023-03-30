import { IStory } from '../../Types/types';
import { timeConverter } from '../../Utils/time-translation';
import style from './story.module.css'


type Props = {
  story: IStory
}

const Story = ({story}: Props) => (
    <section className={style.section}>
      <h1 className={style.title}>{story.title}</h1>
      <div className={style.text}>UserName: {story.by}</div>
      <div className={style.text}>Time: {timeConverter(story.time)}</div>
      {story.url && <a className={style.url} href={story.url}>Link: {story.url}</a>}
      <div className={style.length}>count comments: {story.kids ? story.kids.length : '0'}</div>
      <hr />
    </section>
  );

export default Story;
