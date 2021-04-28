// import { AppState } from '../AppState'
import { AppState } from '../AppState'
import { api } from './AxiosService'

class TasksService {
  async getAllTasks(id) {
    const res = await api.get(`api/lists/${id}/tasks`)
    AppState.tasks[id] = res.data
  }

  async getOneTask(id, id2) {
    const res = await api.get(`api/lists${id}/tasks/${id2}`)
    AppState.activeTask = res.data
  }

  async createTask(task) {
    const res = await api.post('api/tasks', task)
    console.log(res.data)
    // better way because we donthave to make another call to the back end and will do it localy
    AppState.tasks[task.listId].push(res.data)
  }

  async editTask(id, body) {
    await api.put(`api/tasks/${id}`, body)
    this.getAllTasks()
  }

  async deleteTask(id) {
    await api.delete(`api/tasks/${id}`)
    this.getAllTasks()
  }
}

export const tasksService = new TasksService()
