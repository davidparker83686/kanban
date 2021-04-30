<template>
  <div>
    <div class="modal dark-blue-over"
         id="board"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
         data-backdrop=""
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-danger">
          <div class="modal-header border-bottom-0 d-flex justify-content-center">
            <h5 class="modal-title  text-light" id="exampleModalLabel">
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
                <button type="submit" class="btn hover-white btn-primary border-0 dark-blue-text">
                  Create
                </button>
                <button type="button" class="btn  btn-warning dark-blue-text" data-dismiss="modal">
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
.hover-white:hover{
  color:rgb(255, 255, 255)
}

</style>
