import { makeAutoObservable } from 'mobx'
import { IStory } from '../Types/types'
import FetchService from './../API/fetchServise'


class MainPageStore {
    
    news: IStory[] = []
    isLoading: boolean = true
    error: boolean = false

    constructor () {
        makeAutoObservable(this)
    }

    getIdNews = async () => {
        try {
            this.news = []
            this.error = false;
            this.isLoading = false;
            await this.getNews(await FetchService.getDataId());
        } catch (error) {
            this.isLoading = true;
            this.error = true;
        } 
    }

    getNews = async (idArray: number[]) => {
        return Promise.all(idArray.map((element: number) => FetchService.getStory(element)))
        .then(res => {

            if (res[0]?.error) {
                throw res
            }
            this.news = [...res].sort((a, b) => b.time - a.time) 
        })
        .catch(() => this.error = true)
        .finally(() => this.isLoading = true)
    }

    initAutoInterval = () => {  
        return  setInterval( async () => {
            this.getIdNews()
        }, 60000)
    }
}

export default new MainPageStore();