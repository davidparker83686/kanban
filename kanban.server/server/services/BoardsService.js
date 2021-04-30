import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async getAllBoards(query = {}) {
    const boards = await dbContext.Board.find(query)
    return boards
  }

  async getOneBoard(id) {
    const board = await dbContext.Board.findOne({ _id: id })
    if (!board) {
      throw new BadRequest('Invalid Id')
    }
    return board
  }

  async deleteBoard(query = {}) {
    const data = await dbContext.Board.findOneAndDelete(query)
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'successfully deleted'
  }

  async editBoard(body) {
    // what does this param say?
    const data = await dbContext.Board.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Board Id or Not The Creator')
    }
    return data
  }

  async createBoard(body) {
    return await dbContext.Board.create(body)
  }
}

export const boardsService = new BoardsService()
