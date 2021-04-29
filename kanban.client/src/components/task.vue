<template>
  <div class="row justify-content-center">
    <div class="col-11 d-flex px-3 justify-content-center my-2">
      <div class="card shadow " style="width: 18rem; cursor: pointer">
        <div class="card-body">
          <div class="d-flex justify-content-end">
            <button class="btn text-danger" @click="deleteTask()">
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
        <div>
          <comment v-for="comment in state.comments" :key="comment.id" :comment="comment" />
        </div>
        <button type="button" class="btn btn-primary mt-1 mb-2 mx-2" @click="openModal" data-toggle="modal" :data-target="'#comment' + task.id">
          Add A Comment
        </button>
        <div class="dropdown d-flex justify-content-center mb-2">
          <button class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
          >
            Dropdown button
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <div class="dropdown-item" href="#" v-for="list in state.list" :key="list.id" @click="changeList(list.id)">
              {{ list.title }}
            </div>
          </div>
        </div>
      </div>

      <commentCreationModal :task-id="task.id" />
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
// import { listsService } from '../services/ListsService'
// import { useRoute } from 'vue-router'

export default {
  name: 'Task',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    // const route = useRoute()
    const state = reactive({
      comments: computed(() => AppState.comments[props.task.id]),
      list: computed(() => AppState.lists.filter(l => l.id !== props.task.listId)),
      tasks: computed(() => AppState.tasks)
    })
    onMounted(async() => {
      try {
        await commentsService.getAllComments(props.task.id)
        // await listsService.changeList(route.params.id, props.task.listId)
      } catch (error) {
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
      // async getAllLists(id){
      //   try {

      //   } catch (error) {

      //   }
      // }
      async deleteTask() {
        try {
          await tasksService.deleteTask(props.task)
        } catch (error) {
          logger.error(error)
        }
      },
      async changeList(list) {
        try {
          await tasksService.moveList(list, props.task)
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
