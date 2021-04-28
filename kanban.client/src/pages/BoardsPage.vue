<template>
  <div class="container-fluid">
    <div class="row justify-content-around">
      <div class="boardsPage d-flex col-12 justify-content-between mx-5 mt-3">
        <h1>USER</h1>
        <button type="button" class="btn btn-" data-toggle="modal" data-target="#board">
          New Board
        </button>
      </div>
    </div>
    <div class="row">
      <!-- CARDS GO HERE -->
      <board v-for="board in state.boards" :key="board.id" :board="board" />
    </div>
    <boardCreationModal />
  </div>
</template>

<script>
import { onMounted, computed, reactive } from 'vue'
import { boardsService } from '../services/BoardsService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

export default {
  name: 'Boards',
  setup() {
    const state = reactive({
      boards: computed(() => AppState.boards)
    })
    onMounted(async() => {
      try {
        await boardsService.getAllBoards()
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

<style lang="scss" scoped>
// .home{
// }

.btn-color{
  background-color: aqua;
}
// .new-board-button{
//   max-height: 50px;
// }
</style>
