<template>
  <div class="col-11 col-md-3  d-flex px-2 justify-content-center my-2">
    <div class="card shadow " style="width: 18rem">
      <div class="card-body">
        <!-- router link -->
        <!-- <router-link :to="{name: 'BoardsDetails', params: {id: board.id}}"> -->
        <div class="row justify-content-between">
          <div class="col-md-8">
            <h3 class="card-title list word-wrap dark-blue-text">
              {{ (list.title ).toUpperCase() }}
            </h3>
          </div>

          <div class="col-md-2">
            <button class="btn text-danger" title="Delete List" aria-label="Delete List" @click="deleteList(list.id)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
          <h5>{{ list.creatorid }}</h5>
        </div>

        <div>
          <task v-for="task in state.tasks" :key="task.id" :task="task" />
        </div>
        <!-- </router-link> -->
      </div>
      <button type="button" @click="openModal" class="btn btn-outline-info mt-1 mb-2 mx-2" data-toggle="modal" :data-target="'#task' + list.id">
        Add A Task
      </button>
    </div>
    <taskCreationModal :list-id="list.id" />
  </div>
</template>
<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { listsService } from '../services/ListsService'
// import { tasksService } from '../services/TasksService'
// import { listsService } from '../services/ListsService'
import { logger } from '../utils/Logger'
import { tasksService } from '../services/TasksService'
// import $ from 'jquery'
export default {
  name: 'List',
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      tasks: computed(() => AppState.tasks[props.list.id]),
      lists: computed(() => AppState.lists)
    })
    onMounted(async() => {
      try {
        // ??? how to have task know wat list when doing list we used route.params.id however were not leaving a page so we couldnt use route.params.id to give it the list id???
        await tasksService.getAllTasks(props.list.id)
      } catch (error) {
      }
    }

    )
    return {
      state,
      async getOneList(id) {
        try {
          // await listsService.getOneList(id)
        } catch (error) {
          logger.error(error)
        }
      },
      async deleteList(id) {
        try {
          await listsService.deleteList(id)
        } catch (error) {
          logger.error(error)
        }
      }
      // openModal() {
      //   $(`#task${props.list.id}`).modal('show')
      //   $('.modal-backdrop.show').show()
      // }
    }
  }
}
</script>
<style scoped>
.list {
  color: black !important;
  text-decoration: none!important;
}
.word-wrap{
  word-wrap: break-word;
}
</style>
