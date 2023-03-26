import { makeAutoObservable } from 'mobx'
import FetchService from '../../API/fetchServise'

interface IComment {
    deleted: boolean
    text: string
    by: string
    descendants: number
    id: number
    kids: number[]
    st: boolean
    parent: number
    score: number
    time: number
    title: string
    type: string
    children: IComment[]
  }

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


class NewsPageStore {

    story: IStory = {
        by: '', 
        descendants: 0, 
        id: 0, 
        kids: [], 
        score: 0, 
        time: 0, 
        title: '', 
        type: '', 
        url: ''
    }

    comments: IComment[] = []
    status: boolean = false
    error: boolean = false
    stateArrayLine: IComment[] = []

    constructor() {
        makeAutoObservable(this)
    }

    async getCommentsById(id: number) {
        try {
            this.stateArrayLine = []
            this.error = false
            this.status = false
            this.story = await FetchService.getStory(id)
            this.getComments(this.story.kids as number[])
        } catch (error) {
            this.error = true
            this.status = true
        }
    }

    getComments (commentIds: number[]) {

        Promise.all(commentIds.map(el => FetchService.getStory(el)))
        .then((res) => {
            this.status = true
            this.stateArrayLine.push(...this.normaliseData(res)) 
            this.comments = this.getCommentsTree(this.stateArrayLine)
        })
        .catch(() => {
            this.error = true
        })
    }

    normaliseData(array: IComment[]) {
        return array.map(el => {
            return {...el, st: false}
        })
    }

    getCommentsTree (commentIds: IComment[]) {

            const roots: IComment[] = [ ],
                    map: IComment[] = [ ],
                    id: number[] = [ ];

            commentIds.forEach( (item: IComment) => {
                map.push( {...item} ); 
                id.push( item.id );
            } );

            let i;

            map.forEach((item: IComment) => {
                if (!item.parent || ( i = id.indexOf( item.parent ) ) === -1 ) {
                    roots.push( item );
                    return;
                }
                if ( map[i].children ) {
                    map[i].children.push( item );
                }
                else {
                    map[i].children = [ item ];
                }
            } );

            return roots;
    }

    toggleStatus(id: number) {
        
        const obj = this.stateArrayLine.find(el => el.id === id)

        this.stateArrayLine.forEach(el => {
            if (el.id === id) {
                el.st = !el.st
            }
        })

        const objParent = this.stateArrayLine.find(el => el.parent === id)

        if (objParent) {
            this.comments = this.getCommentsTree(this.stateArrayLine)
        } else {
            this.getComments(obj?.kids as number[])
        }
    }

}


export default new NewsPageStore();
