import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { listsService } from '../services/ListsServices'

export class ListsController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllLists)
      .get('/:id', this.getOneList)
      .delete('/:id', this.deleteList)
      .put('/:id', this.editList)
      .post('', this.createList)
  }

  async getAllLists(req, res, next) {
    try {
      const data = await listsService.find(req.query)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getOneList(req, res, next) {
    try {
      const data = await listsService.getOneList(req.query)
      // data  is returning what is given back from teh service
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteList(req, res, next) {
    try {
      const data = await listsService.deleteList(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async editList(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const data = await listsService.editList(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async createList(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const data = await listsService.createList(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
