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
    await api.post('api/lists', list)
    this.getAllLists()
  }

  async editList(id, body) {
    await api.put(`api/lists/${id}`, body)
    this.getAllLists()
  }

  async deleteList(id) {
    await api.delete(`api/lists/${id}`)
    this.getAllLists()
  }
}

export const listsService = new ListsService()
