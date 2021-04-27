import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async getAllTasks(query = {}) {
    const tasks = await dbContext.Task.find(query)
    return tasks
  }

  async getOneTask(id) {
    const task = await dbContext.Task.findOne({ _id: id })
    if (!task) {
      throw new BadRequest('Invalid Id')
    }
    return task
  }

  async deleteTask(id) {
    const data = await dbContext.Task.findByIdAndDelete(id)
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'successfully deleted'
  }

  async editTask(body) {
    // what does this param say?
    const data = await dbContext.Task.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async createTask(body) {
    return await dbContext.Task.create(body)
  }
}

export const tasksService = new TasksService()
