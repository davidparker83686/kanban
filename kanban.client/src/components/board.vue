<template>
  <div class="col-11 col-md-3 d-flex px-2 justify-content-center my-2">
    <div class="card shadow " style="width: 18rem;">
      <div class="card-body">
        <div class="row justify-content-between">
          <div class="col-md-8">
            <router-link :to="{name: 'BoardsDetails', params: {id: board.id}}">
              <h3 class="card-title board dark-blue-text" title="Board Name">
                {{ board.title }}
              </h3>
            </router-link>
          </div>

          <div class="col-md-2">
            <button class="btn text-danger" title="Delete Board" aria-label="Delete Board" @click="deleteBoard(board.id)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
          <h5>{{ board.creatorid }}</h5>
        </div>
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
import Notification from '../utils/Notification'

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
          Notification.toast('Successfully Deleted Post', 'success')
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
