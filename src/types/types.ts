export interface IComment {
    deleted: boolean
    text: string
    by: string
    descendants: number
    id: number
    kids: number[]
    isExpanded: boolean
    parent: number
    score: number
    time: number
    title: string
    type: string
    children: IComment[]
    visible: boolean
    error?: string
}

export interface IStory {
  by: string
  descendants: number
  id: number
  kids?: number[]
  score: number
  time: number
  title: string
  type: string
  url: string
  visible: boolean
  error?: string
}

export type idRequest = string | number 
