import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async getAllComments(query = {}) {
    const comments = await dbContext.Comments.find(query)
    return comments
  }

  async getOneComment(id) {
    const comment = await dbContext.Comments.findOne(id)
    if (!comment) {
      throw new BadRequest('Invalid Id')
    }
    return comment
  }

  async deleteComment(id) {
    const data = await dbContext.Comments.findByIdAndDelete(id)
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'successfully deleted'
  }

  async editComment(body) {
    // what does this param say?
    const data = await dbContext.Comments.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async createComment(body) {
    return await dbContext.Comments.create(body)
  }
}

export const commentsService = new CommentsService()
