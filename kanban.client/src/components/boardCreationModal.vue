<template>
  <div>
    <div class="modal"
         id="board"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
         data-backdrop=""
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-danger">
          <div class="modal-header d-flex justify-content-center">
            <h5 class="modal-title" id="exampleModalLabel">
              NEW BOARD
            </h5>
          </div>
          <div class="modal-body">
            <form class="form-group" @submit.prevent="createBoard">
              <label for="name"></label>
              <input type="text"
                     class="form-control"
                     id="name"
                     placeholder="board..."
                     v-model="state.newBoard.title"
                     required
              >
              <div class="modal-footer d-flex justify-content-around">
                <button type="submit" class="btn btn-primary">
                  Create
                </button>
                <button type="button" class="btn  btn-secondary" data-dismiss="modal">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { boardsService } from '../services/BoardsService'
import $ from 'jquery'

export default {
  Name: 'BoardModal',
  setup() {
    const state = reactive({
      newBoard: {}
    })
    return {
      state,
      async createBoard() {
        $('#board').modal('hide')
        await boardsService.createBoard(state.newBoard)
        state.newBoard = {}
      }
    }
  }
}
</script>
<style scoped>

</style>
