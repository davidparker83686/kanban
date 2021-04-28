import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListsService {
  async getAllLists(id) {
    const lists = await dbContext.List.find({ boardId: id })
    return lists
  }

  async getOneList(id) {
    const list = await dbContext.List.findOne({ _id: id })
    if (!list) {
      throw new BadRequest('Invalid Id')
    }
    return list
  }

  async deleteList(id) {
    const data = await dbContext.List.findByIdAndDelete(id)
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'successfully deleted'
  }

  async editList(body) {
    // what does this param say?
    const data = await dbContext.List.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async createList(body) {
    return await dbContext.List.create(body)
  }
}

export const listsService = new ListsService()
