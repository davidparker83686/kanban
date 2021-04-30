<template>
  <div>
    <div class="modal dark-blue-over"
         id="list"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
         data-backdrop=""
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-danger">
          <div class="modal-header border-bottom-0 d-flex justify-content-center">
            <h5 class="modal-title text-light" id="exampleModalLabel">
              NEW LIST
            </h5>
          </div>
          <div class="modal-body">
            <form class="form-group" @submit.prevent="createList">
              <label for="name"></label>
              <input type="text"
                     class="form-control"
                     id="name"
                     placeholder="list..."
                     v-model="state.newList.title"
                     required
              >
              <div class="modal-footer d-flex justify-content-around">
                <button type="submit" class="btn hover-white btn-primary border-0 dark-blue-text">
                  Create
                </button>
                <button type="button" class="btn btn-warning" data-dismiss="modal">
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
import { listsService } from '../services/ListsService'
import $ from 'jquery'
// import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'

export default {
  Name: 'ListModal',
  setup() {
    const route = useRoute()
    const state = reactive({
      newList: {}
    })
    return {
      state,
      async createList() {
        state.newList.boardId = route.params.id
        await listsService.createList(state.newList)
        state.newList = {}
        $('#list').modal('hide')
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
