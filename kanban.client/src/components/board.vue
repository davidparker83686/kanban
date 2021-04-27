<template>
  <div class="col-3 d-flex px-2 justify-content-center my-2">
    <div class="card shadow " style="width: 18rem;cursor: pointer">
      <div class="card-body">
        <div class="d-flex justify-content-end">
          <button class="btn text-danger" @click="deleteBoard(board.id)">
            X
          </button>
        </div>
        <router-link :to="{name: 'BoardsDetails', params: {id: board.id}}">
          <div class="d-flex justify-content-center">
            <h3 class="card-title board">
              {{ board.title }}
            </h3>
            <h5>{{ board.creatorid }}</h5>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { boardsService } from '../services/BoardsService'
// import { boardsService } from '../services/BoardsService'
import { logger } from '../utils/Logger'

export default {
  name: 'Board',
  props: {
    board: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      boards: computed(() => AppState.boards)
    })
    return {
      state,
      async getOneBoard(id) {
        try {
          // await boardsService.getOneBoard(id)
        } catch (error) {
          logger.error(error)
        }
      },
      async deleteBoard(id) {
        try {
          await boardsService.deleteBoard(id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>
<style scoped>
.board {
  color: black !important;
  text-decoration: none!important;
}
</style>
