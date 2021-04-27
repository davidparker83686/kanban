import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { tasksService } from '../services/TasksService'
import { commentsService } from '../services/CommentsService'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)

      .delete('/:id', this.deleteTask)
      .put('/:id', this.editTask)
      .post('', this.createTask)
      .get('/:id/comments', this.getAllComments)
      .get('/:id/comments/:id', this.getOneComment)
  }

  async getAllComments(req, res, next) {
    try {
      const data = await commentsService.getAllComments(req.query)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getOneComment(req, res, next) {
    try {
      const data = await commentsService.getOneComment(req.params.id)
      // data  is returning what is given back from teh service
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteTask(req, res, next) {
    try {
      const data = await tasksService.deleteTask(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async editTask(req, res, next) {
    try {
      req.body.id = req.params.id
      const data = await tasksService.editTask(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async createTask(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const data = await tasksService.createTask(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
