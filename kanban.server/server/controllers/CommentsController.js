import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsServices'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllComments)
      .get('/:id', this.getOneComment)
      .delete('/:id', this.deleteComment)
      .put('/:id', this.editComment)
      .post('', this.createComment)
  }

  async getAllComments(req, res, next) {
    try {
      const data = await commentsService.find(req.query)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getOneComment(req, res, next) {
    try {
      const data = await commentsService.getOneComment(req.query)
      // data  is returning what is given back from teh service
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteComment(req, res, next) {
    try {
      const data = await commentsService.deleteComment(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async editComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const data = await commentsService.editComment(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async createComment(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const data = await commentsService.createComment(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
