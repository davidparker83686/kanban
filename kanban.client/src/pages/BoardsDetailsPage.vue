<template>
  <div class="container-fluid super-light-green">
    <div class="row justify-content-around  ">
      <div class="listsPage d-flex col-12 justify-content-between my-3 px-5" v-if="state.board">
        <h2>{{ (state.board.title).toUpperCase() }}</h2>
        <button type="button" title="Create List" class="btn btn-info lightest-green-text" data-toggle="modal" data-target="#list">
          NEW LIST
        </button>
      </div>
    </div>
    <listCreationModal />
    <div class="row  side-scroll w-90 " v-if="state.lists">
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
// .new-list-button{
//   max-height: 50px;
// }

@media screen and (min-width:760px){
.side-scroll{
    overflow-x: auto;
    // overflow-:auto;
    flex-wrap: nowrap;
    max-width: 100vw;// display: inline-block;
}
}
</style>
