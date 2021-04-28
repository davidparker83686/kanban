<template>
  <div>
    <div class="modal"
         :id="'task' + listId"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
         data-backdrop=""
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              New Task
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="form-group" @submit.prevent="createTask">
              <label for="name"></label>
              <input type="text"
                     class="form-control"
                     id="name"
                     placeholder="name"
                     v-model="state.newTask.title"
                     required
              >
              <button type="submit" class="btn btn-primary">
                Create
              </button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { tasksService } from '../services/TasksService'
import $ from 'jquery'

export default {
  Name: 'TaskModal',
  props: {
    listId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      newTask: {}
    })
    return {
      state,
      async createTask() {
        state.newTask.listId = props.listId
        await tasksService.createTask(state.newTask)
        state.newTask = {}
        $(`#task${props.listId}`).modal('hide')
      }
    }
  }
}
</script>
<style scoped>

</style>
