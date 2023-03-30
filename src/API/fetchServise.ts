import { host } from "../host";
import { idRequest } from "../Types/types";


export default class FetchService {

  static async getDataId() {
    const response = await fetch(`${host}/v0/topstories.json`);
    const json = await response.json();
    return json.slice(0,100);
  }

  static async getStory(id: idRequest) {
    const response = await fetch(`${host}/v0/item/${id}.json?print=pretty`);
    const json = await response.json();
    return json;
  }

  static async getComment(id: idRequest) {
    const response = await fetch(`${host}/v0/item/${id}.json?print=pretty`);
    const json = await response.json();
    return json;
  }
}


