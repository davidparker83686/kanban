<template>
  <div class="col-12 d-flex px-3 justify-content-center my-2">
    <div class="card shadow " style="width: 18rem;cursor: pointer">
      <div class="card-body">
        <div class="d-flex justify-content-end">
          <button class="btn text-danger" @click="deleteTask(task.id)">
            X
          </button>
        </div>
        <!-- <router-link :to="{name: 'BoardsDetails', params: {id: board.id}}"> -->
        <div class="d-flex justify-content-center">
          <h3 class="card-title task">
            {{ (task.title).toUpperCase() }}
          </h3>
          <h5>{{ task.creatorid }}</h5>
        </div>
        <!-- </router-link> -->
      </div>
      <div style="
    align-self: center;
"
      >
        <comment v-for="comment in state.comments" :key="comment.id" :comment="comment" />
        <button type="button" class="btn btn-primary m-1">
          Add A Comment
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { tasksService } from '../services/TasksService'
import { commentsService } from '../services/CommentsService'
// import { tasksService } from '../services/TasksService'
import { logger } from '../utils/Logger'

export default {
  name: 'Task',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      tasks: computed(() => AppState.tasks)
    })
    onMounted(async() => {
      try {
        await commentsService.getAllComments()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      async getOneTask(id) {
        try {
          // await tasksService.getOneTask(id)
        } catch (error) {
          logger.error(error)
        }
      },
      async deleteTask(id) {
        try {
          await tasksService.deleteTask(id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>
<style scoped>
.task {
  color: black !important;
  text-decoration: none!important;
}
</style>
