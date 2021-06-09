<template>
  <div class="row justify-content-center">
    <div class="col-12 d-flex px-3  my-2">
      <div class="card dark-blue-text light-blue shadow " style="width: 18rem">
        <div class="card-body">
          <!-- <router-link :to="{name: 'BoardsDetails', params: {id: board.id}}"> -->

          <div class="row justify-content-between">
            <div class="col-7 col-md-8">
              <h3 class="card-title task">
                {{ (task.title).toUpperCase() }}
              </h3>
            </div>

            <div class="col-2">
              <button class="btn text-danger" title="Delete Task" aria-label="Delete Task" @click="deleteTask()">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>

            <h5>{{ task.creatorid }}</h5>
          </div>
        </div>
        <div class="scroll">
          <comment v-for="comment in state.comments" :key="comment.id" :comment="comment" />
        </div>

        <div class="row">
          <div class="col-6 ">
            <div class="dropdown  d-flex justify-content-center mb-2 ">
              <button class="btn drop btn-none text-success dropdown-togglen w-100 mt-1 mb-2 mx-2 big-icon"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      title="Move Task"
              >
                <i class="fas fa-exchange-alt"></i>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <div class="dropdown-item" href="#" v-for="list in state.list" :key="list.id" @click="changeList(list.id)">
                  {{ list.title }}
                </div>
              </div>
            </div>
          </div>

          <div class="col-6 ">
            <button type="button"
                    class="btn btn-none text-info mt-1 mb-2 mx-2 big-icon"
                    title="Create Comment"
                    @click="openModal"
                    data-toggle="modal"
                    :data-target="'#comment' + task.id"
            >
              <i class="fas fa-comments"></i>
            </button>
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

.drop:hover{
  color: white;
}
.big-icon {
    font-size: 32px;
}
.scroll{
    overflow-y: scroll;
    max-height: 13vw;
}
@media screen and (max-width:760px){
  .scroll{
    overflow-y: scroll;
    /* overflow-x: hidden; */
    max-height: 25vw;
  }
}
</style>
