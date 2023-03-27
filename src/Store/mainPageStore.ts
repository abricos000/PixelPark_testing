import { makeAutoObservable } from 'mobx'
import { timeConverter } from '../match'
import { IStory } from '../types/types'
import FetchService from './../API/fetchServise'


class MainPageStore {
    
    news: IStory[] = []
    isLoadinп: boolean = true
    error: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    async getIdNews(bool: boolean) {
        try {
            this.news = []
            this.error = false;
            if (bool) {
                this.isLoadinп = false;
            }
            this.getNews(await FetchService.getDataId());
        } catch (error) {
            if (bool) {
                this.isLoadinп = true;
            }
            this.error = true;
        } 
    }

    getNews (idArray: number[]) {
        Promise.all(idArray.map((element: number) => FetchService.getStory(element)))
        .then(res => this.sortNews(res))
        .catch(() => this.error = true)
        .finally(() => this.isLoadinп = true)
    }

    sortNews(data: IStory[]) {
        this.news = [...data].sort((a, b) => b.time - a.time)
        this.news = this.news.map(el => ({...el, timeData: timeConverter(el.time as number)}))
    }

    initAutoInterval(){  
        return  setInterval(async() => {
            this.getIdNews(false)
            console.log('автоматическое обновление')
        }, 60000)
    }
}


export default new MainPageStore();
