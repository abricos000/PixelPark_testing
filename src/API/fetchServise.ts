export default class FetchService {
        static async getDataId() {

                        const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
                        const json = await response.json()
                        return json.slice(0,100)

        }
        static async getStory(id: number) {

                        const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                        const json = await response.json();
                        return json
// разные запросы сделать для коментов и историй
        }
}