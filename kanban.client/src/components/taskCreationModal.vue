<template>
  <div>
    <div class="modal dark-blue-over"
         :id="'task' + listId"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
         data-backdrop=""
    >
      <div class="modal-dialog " role="document">
        <div class="modal-content bg-danger">
          <div class="modal-header border-bottom-0 d-flex justify-content-center">
            <h5 class="modal-title text-light" id="exampleModalLabel">
              NEW TASK
            </h5>
          </div>
          <div class="modal-body">
            <form class="form-group" @submit.prevent="createTask">
              <label for="name"></label>
              <input type="text"
                     class="form-control "
                     id="name"
                     placeholder="task..."
                     v-model="state.newTask.title"
                     required
              >
              <div class="modal-footer d-flex justify-content-around ">
                <button type="submit" class="btn hover-white btn-primary border-0 dark-blue-text">
                  Create
                </button>
                <button type="button" class="btn btn-warning" data-dismiss="modal">
                  Close
                </button>
              </div>
            </form>
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
