// import { AppState } from '../AppState'
import { AppState } from '../AppState'
import { api } from './AxiosService'

class ListsService {
  async getAllLists(id) {
    const res = await api.get(`api/boards/${id}/lists`)
    AppState.lists = res.data
  }

  async getOneList(id, id2) {
    const res = await api.get(`api/boards/${id}/lists/${id2}`)
    AppState.activeList = res.data
  }

  async createList(list) {
    const res = await api.post('api/lists', list)
    console.log(res.data)
    // better way because we donthave to make another call to the back end and will do it localy
    AppState.lists.push(res.data)
  }

  async editList(id, body) {
    await api.put(`api/lists/${id}`, body)
    this.getAllLists()
  }

  async deleteList(id) {
    await api.delete(`api/lists/${id}`)
    AppState.lists = AppState.lists.filter(l => l.id !== id)
  }
}

export const listsService = new ListsService()
