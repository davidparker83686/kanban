// import { AppState } from '../AppState'
import { AppState } from '../AppState'
import { api } from './AxiosService'
import Notification from '../utils/Notification'

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
    Notification.toast('Successfully Created Task', 'success')
  }

  async editTask(id, body) {
    await api.put(`api/tasks/${id}`, body)
    this.getAllTasks()
  }

  async deleteTask(prop) {
    await api.delete(`api/tasks/${prop.id}`)
    this.getAllTasks(prop.listId)
    Notification.toast('Successfully Deleted Task', 'success')
  }

  async moveList(list, task) {
    const old = task.listId
    task.listId = list
    const res = await api.put(`api/tasks/${task.id}`, task)
    this.getAllTasks(res.data.listId)
    this.getAllTasks(old)
  }
}

export const tasksService = new TasksService()
