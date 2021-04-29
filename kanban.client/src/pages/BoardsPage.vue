<template>
  <div class="container-fluid super-light-green">
    <div class="row justify-content-around">
      <div class="boardsPage d-flex col-12 justify-content-between px-5 my-3">
        <h2>{{ state.account.name.split('@')[0] }}'s boards</h2>
        <button type="button" class="btn btn-info lightest-green-text" data-toggle="modal" title="Create Board" data-target="#board">
          New Board
        </button>
      </div>
    </div>
    <div class="row justify-content-around">
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
      boards: computed(() => AppState.boards),
      account: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        await boardsService.getAllBoards()
        logger.log(state.account)
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

<style lang="scss" >

</style>
