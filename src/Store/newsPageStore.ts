import { makeAutoObservable } from 'mobx'
import { IComment, idRequest, IStory } from '../Types/types'
import FetchService from './../API/fetchServise'


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
        url: '',
        visible: false
    }
    commentsTree: IComment[] = []
    isLoading: boolean = false
    error: boolean = false
    comments: IComment[] = []

    constructor () {
        makeAutoObservable(this)
    }

     getCommentsById = async (id: idRequest) => {
        try {
            this.comments = []
            this.error = false
            this.isLoading = false
            const data = await FetchService.getStory(id)

            if (data?.error) {
                throw data
            }
            this.story = data
            this.story.kids ? this.getComments(this.story.kids as number[]) : this.isLoading = true
        } catch (error) {
            this.error = true
            this.isLoading = true
        }
    }

    getComments = (commentIds: number[]) => {

        Promise.all(commentIds.map(el => FetchService.getComment(el)))
        .then((res) => {

            if (res[0]?.error) {
                throw res
            }
            this.isLoading = true
            this.comments.push(...this.normalizeData(res)) 
            this.commentsTree = this.getCommentsTree(this.comments)
        })
        .catch(() => {
            this.error = true
        })
    }

    normalizeData = (arrayComments: IComment[]) => {
        this.story = {...this.story, visible: false}
        return arrayComments.map(el => ({...el, isExpanded: false, visible: false}))
    }

    getCommentsTree = (commentIds: IComment[]) => {
        let i: number;

        const roots: IComment[] = [ ],
            map: IComment[] = [ ],
            id: number[] = [ ]

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

    toggleStatus = (id: number) => {

        const obj = this.comments.find(el => el.id === id)

        this.comments.forEach(el => {
            if (el.id === id) {
                el.isExpanded = !el.isExpanded
            }
        })

        const objParent = this.comments.find(el => el.parent === id)

        if (obj && !objParent && !obj?.visible) {
            obj.visible = true
            this.getComments(obj?.kids as number[])
        } 
        else {
            this.commentsTree = this.getCommentsTree(this.comments)
        }
    }
}


export default new NewsPageStore();
