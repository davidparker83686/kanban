import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { tasksService } from '../services/TasksServices'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllTasks)
      .get('/:id', this.getOneTask)
      .delete('/:id', this.deleteTask)
      .put('/:id', this.editTask)
      .post('', this.createTask)
  }

  async getAllTasks(req, res, next) {
    try {
      const data = await tasksService.find(req.query)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getOneTask(req, res, next) {
    try {
      const data = await tasksService.getOneTask(req.query)
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
      req.body.creatorId = req.userInfo.id
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
