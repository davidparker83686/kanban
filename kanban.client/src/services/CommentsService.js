// import { AppState } from '../AppState'
import { AppState } from '../AppState'
import { api } from './AxiosService'
import Notification from '../utils/Notification'

class CommentsService {
  async getAllComments(id) {
    const res = await api.get(`api/tasks/${id}/comments`)
    AppState.comments[id] = res.data
  }

  async getOneComment(id, id2) {
    const res = await api.get(`api/tasks${id}/comments/${id2}`)
    AppState.activeComment = res.data
  }

  async createComment(comment) {
    const res = await api.post('api/comments', comment)
    // better way because we donthave to make another call to the back end and will do it localy
    console.log(AppState.comments)
    AppState.comments[comment.taskId].push(res.data)
    Notification.toast('Successfully Created Comment', 'success')
  }

  async editComment(id, body) {
    await api.put(`api/comments/${id}`, body)
    this.getAllComments()
  }

  async deleteComment(prop) {
    await api.delete(`api/comments/${prop.id}`)
    this.getAllComments(prop.taskId)
    Notification.toast('Successfully Deleted Comment', 'success')
  }
}

export const commentsService = new CommentsService()
