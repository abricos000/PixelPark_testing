import { makeAutoObservable } from 'mobx'
import { timeConverter } from '../match'
import { IComment, IStory } from '../types/types'
import FetchService from './../API/fetchServise'


class NewsPageStore {

    story: IStory = {
        by: '', 
        descendants: 0, 
        id: 0, 
        kids: [], 
        score: 0, 
        timeData: '',
        time: 0, 
        title: '', 
        type: '', 
        url: '',
        visible: false
    }

    commentsTree: IComment[] = []
    isLoading: boolean = false
    error: boolean = false
    comments: IComment[] = []

    constructor() {
        makeAutoObservable(this)
    }

    async getCommentsById(id: number) {

        try {
            this.comments = []
            this.error = false
            this.isLoading = false
            this.story = await FetchService.getStory(id)
            this.getComments(this.story.kids as number[])
        } catch (error) {
            this.error = true
            this.isLoading = true
        }
    }

    getComments (commentIds: number[]) {

        Promise.all(commentIds.map(el => FetchService.getComment(el)))
        .then((res) => {
            this.isLoading = true
            this.comments.push(...this.normaliseData(res)) 
            this.commentsTree = this.getCommentsTree(this.comments)
        })
        .catch(() => {
            this.error = true
        })
    }

    normaliseData(arrayComments: IComment[]) {

        this.story = {...this.story, timeData: timeConverter(this.story.time), visible: false}
        return arrayComments.map(el => ( {...el, status: false, timeData: timeConverter(el.time), visible: false}))
    }

    getCommentsTree (commentIds: IComment[]) {
        let i;

        const roots: IComment[] = [ ],
                map: IComment[] = [ ],
                id: number[] = [ ];

        commentIds.forEach( (item: IComment) => {
            map.push( {...item} ); 
            id.push( item.id );
        });


        map.forEach((item: IComment) => {
            if ( !item.parent || ( i = id.indexOf( item.parent ) ) === -1 ) {
                roots.push( item );
                return;
            }
            if ( map[i].children ) {
                map[i].children.push( item );
            } else {
                map[i].children = [ item ];
            }
        });

        return roots;
    }

    toggleStatus(id: number) {

        const obj = this.comments.find(el => el.id === id)

        this.comments.forEach(el => {
            if (el.id === id) {
                el.status = !el.status
            }
        })

        const objParent = this.comments.find(el => el.parent === id)

        if (obj && !objParent && !obj?.visible) {
            obj.visible = true
            this.getComments(obj?.kids as number[])
        } else {
            this.commentsTree = this.getCommentsTree(this.comments)
        }
    }
}


export default new NewsPageStore();
