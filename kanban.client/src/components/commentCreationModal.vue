<template>
  <div>
    <div class="modal dark-blue-over"
         :id="'comment' + taskId"
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
              NEW COMMENT
            </h5>
          </div>
          <div class="modal-body">
            <form class="form-group" @submit.prevent="createComment">
              <label for="name"></label>
              <input type="text"
                     class="form-control"
                     id="name"
                     placeholder="comment..."
                     v-model="state.newComment.body"
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
import { commentsService } from '../services/CommentsService'
import $ from 'jquery'

export default {
  Name: 'CommentModal',
  props: {
    taskId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      newComment: {}
    })
    return {
      state,
      async createComment() {
        state.newComment.taskId = props.taskId
        await commentsService.createComment(state.newComment)
        state.newComment = {}
        $(`#comment${props.taskId}`).modal('toggle')
      }
    }
  }
}
</script>
<style scoped>

</style>
