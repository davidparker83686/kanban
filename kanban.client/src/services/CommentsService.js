// import { AppState } from '../AppState'
import { AppState } from '../AppState'
import { api } from './AxiosService'

class CommentsService {
  async getAllComments(id) {
    const res = await api.get(`api/tasks/${id}/comments`)
    AppState.tasks[id] = res.data
  }

  async getOneComment(id, id2) {
    const res = await api.get(`api/tasks${id}/comments/${id2}`)
    AppState.activeComment = res.data
  }

  async createComment(comment) {
    const res = await api.post('api/comments', comment)
    console.log(res.data)
    // better way because we donthave to make another call to the back end and will do it localy
    AppState.comments[comment.commentId].push(res.data)
  }

  async editComment(id, body) {
    await api.put(`api/comments/${id}`, body)
    this.getAllComments()
  }

  async deleteComment(id) {
    await api.delete(`api/comments/${id}`)
    this.getAllComments()
  }
}

export const commentsService = new CommentsService()
