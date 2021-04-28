<template>
  <div class="container-fluid">
    <div class="row justify-content-around">
      <div class="listsPage d-flex col-12 justify-content-between mx-5 mt-3" v-if="state.board">
        <h1>{{ (state.board.title).toUpperCase() }}</h1>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#list">
          New List
        </button>
      </div>
    </div>
    <listCreationModal />
    <div class="row" v-if="state.lists">
      <!-- LISTS GO HERE -->
      <list v-for="list in state.lists" :key="list.id" :list="list" />
    </div>
    <div class="row" v-else>
      <span>No Lists</span>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, reactive } from 'vue'
import { listsService } from '../services/ListsService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { boardsService } from '../services/BoardsService'
import { useRoute } from 'vue-router'
// import { tasksService } from "../services/TasksService"

export default {
  name: 'BoardsDetails',
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      lists: computed(() => AppState.lists),
      board: computed(() => AppState.activeBoard)
    })
    onMounted(async() => {
      try {
        await boardsService.getOneBoard(route.params.id)
        await listsService.getAllLists(route.params.id)
        // await tasksService.getAllTasks(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state
    }
  }
}
</script>

<style lang="scss">
// .home{
// }
.new-list-button{
  max-height: 50px;
}
</style>
