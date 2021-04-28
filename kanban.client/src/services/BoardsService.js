// import { AppState } from '../AppState'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BoardsService {
  async getAllBoards() {
    const res = await api.get('api/boards')
    AppState.boards = res.data
  }

  async getOneBoard(id) {
    const res = await api.get(`api/boards/${id}`)
    logger.log(res.data)
    AppState.activeBoard = res.data
  }

  async createBoard(board) {
    const res = await api.post('api/boards', board)
    console.log(res.data)
    // better way because we donthave to make another call to the back end and will do it localy
    AppState.boards.push(res.data)
  }

  async editBoard() {

  }

  async deleteBoard(id) {
    await api.delete(`api/boards/${id}`)
    this.getAllBoards()
  }
}

export const boardsService = new BoardsService()
