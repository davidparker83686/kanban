<template>
  <div>
    <div class="modal fade"
         id="comment"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              New Comment
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="form-group" @submit.prevent="createComment">
              <label for="name"></label>
              <input type="text"
                     class="form-control"
                     id="name"
                     placeholder="name"
                     v-model="state.newComment.body"
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
import { commentsService } from '../services/CommentsService'
import $ from 'jquery'

export default {
  Name: 'CommentModal',
  setup() {
    const state = reactive({
      newComment: {}
    })
    return {
      state,
      async createComment() {
        await commentsService.createComment(state.newComment)
        state.newComment = {}
        $('#newComment').modal('hide')
      }
    }
  }
}
</script>
<style scoped>

</style>
