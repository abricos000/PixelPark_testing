import React, { useEffect } from 'react';
import Loader from '../loader/Loader';
import NewsItem from './NewsItem/NewsItem';
import style from './mainPage.module.css'
import mainPageStore from '../../Store/mainPageStore'; 
import { observer } from 'mobx-react';
import NotFoungPage from '../NotFoungErrorPage/NotFoungErrorPage';


const MainPage = observer (() => {

  const  {news, isLoadinп: isLoadind, error} = mainPageStore
  
  useEffect(() => {

    mainPageStore.getIdNews(true)
    let a = mainPageStore.initAutoInterval()

    return () => clearInterval(a)
  }, [])

if (error) {
  return <NotFoungPage click={() => mainPageStore.getIdNews(true)}>refresh the page</NotFoungPage>
}

  return (
    <>
      <section className={style.info}>
        <div className={style.text}>
          In partnership with Firebase, we're making the public Hacker News data available in near real time. 
          Firebase enables easy access from Android, iOS and the web. Servers aren't left out.

          If you can use one of the many Firebase client libraries, you really should. 
          The libraries handle networking efficiently and can raise events when things change. Be sure to check them out.
        </div>
      </section>

      <button onClick={() => mainPageStore.getIdNews(true)} className={style.upDate}>
        upDate News
      </button>

      <section className={style.news}>

        {isLoadind 
          ? news.map(el => <NewsItem key={el.id} story={el} />) 
          : <Loader/>
        }

      </section>
    </>
  );
})


export default MainPage;
