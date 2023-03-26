import { makeAutoObservable } from 'mobx'
import FetchService from '../../API/fetchServise'


interface IStory {
  by: string
  descendants: number
  id: number
  kids: []
  score: number
  time: number
  title: string
  type: string
  url: string
}


class MainPageStore {
    
    news: IStory[] = []
    isLoadind: boolean = true
    error: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    async getIdNews(bool: boolean) {
        try {
            this.news = []
            this.error = false;
            if (bool) {
                this.isLoadind = false;
            }
            this.getNews(await FetchService.getDataId());
        } catch (error) {
            if (bool) {
                this.isLoadind = true;
            }
            this.error = true;
        } 
    }

    getNews (idArray: number[]) {
        // allSettled посмотреть 
        Promise.all(idArray.map((element: number) => FetchService.getStory(element)))
        .then(res => this.sortNews(res))
        .catch(() => this.error = true)
        .finally(() => this.isLoadind = true)
    }

    sortNews(data: IStory[]) {
        this.news = [...data].sort((a, b) => a.time - b.time)
    }

    initAutoInterval(){  
        return  setInterval(async() => {
            this.getIdNews(false)
            console.log('автоматическое обновление')
        }, 60000)
    }
}


export default new MainPageStore();
