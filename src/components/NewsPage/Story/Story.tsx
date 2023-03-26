import style from './story.module.css'


interface IStory {
  by: string
  descendants: number
  id: number
  kids: number[]
  score: number
  time: number
  title: string
  type: string
  url: string
}

type Props = {
  story: IStory
}

const Story = ({story}: Props) => (
    <section className={style.section}>
      <h1 className={style.title}>{story.title}</h1>
      <div className={style.text}>UserName: {story.by}</div>
      <div className={style.text}>Time: {story.time}</div>

      <div className={style.text}>ID: {story.id}</div>

      <a className={style.url} href={story.url}>Link: {story.url}</a>

      <div className={style.length}>count comments: {story.kids?.length}</div>
      <hr />
    </section>
  )

export default Story;
