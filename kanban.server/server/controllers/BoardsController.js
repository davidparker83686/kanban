import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { boardsService } from '../services/BoardsService'
import { listsService } from '../services/ListsService'
import { logger } from '../utils/Logger'

export class BoardsController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllBoards)
      .get('/:id', this.getOneBoard)
      .delete('/:id', this.deleteBoard)
      .put('/:id', this.editBoard)
      .post('', this.createBoard)
      .get('/:id/lists', this.getAllLists)
      .get('/:id/lists/:id', this.getOneList)
  }

  async getAllBoards(req, res, next) {
    try {
      //
      const data = await boardsService.getAllBoards({ creatorId: req.userInfo.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getOneBoard(req, res, next) {
    try {
      const data = await boardsService.getOneBoard(req.params.id)
      // data  is returning what is given back from teh service
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteBoard(req, res, next) {
    try {
      const data = await boardsService.deleteBoard({ _id: req.params.id, creatorId: req.userInfo.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async editBoard(req, res, next) {
    try {
      req.body.id = req.params.id
      const data = await boardsService.editBoard(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async createBoard(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const data = await boardsService.createBoard(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getAllLists(req, res, next) {
    try {
      logger.log(req)
      const data = await listsService.getAllLists(req.params.id)
      logger.log(data)
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
}
