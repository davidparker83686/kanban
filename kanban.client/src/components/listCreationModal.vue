<template>
  <div>
    <div class="modal fade"
         id="list"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              New List
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="form-group" @submit.prevent="createList">
              <label for="name"></label>
              <input type="text"
                     class="form-control"
                     id="name"
                     placeholder="name"
                     v-model="state.newList.title"
                     required
              >
              <button type="submit" class="btn btn-primary">
                Create
              </button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
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

export default {
  Name: 'ListModal',
  setup() {
    const state = reactive({
      newList: {}
    })
    return {
      state,
      async createList() {
        await listsService.createList(state.newList)
        state.newList = {}
        $('#newList').modal('hide')
      }
    }
  }
}
</script>
<style scoped>

</style>
