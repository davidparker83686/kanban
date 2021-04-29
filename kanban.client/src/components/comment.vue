<template>
  <div class="row justify-content-center my-2 align-items-center">
    <div class="col-8 p-0">
      <span class="comment dark-blue-text">
        {{ (comment.body).toUpperCase() }}
        <!-- <h5>{{ comment.creatorid }}</h5> -->
      </span>
    </div>

    <div class="col-1 mx-0 p-0">
      <button class="btn text-danger " title="Delete Comment" aria-label="Delete Comment" @click="deleteComment()">
        <small>
          <i class="far fa-minus-square"></i>
        </small>
      </button>
    </div>

    <!-- <div class="col-12 d-flex  align-items-center my-2 ">
      <div class=" " style="cursor: pointer">
        <div class=" py-0 my-0">
          <div class="d-flex justify-content-end">
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
// import { commentsService } from '../services/CommentsService'
import { logger } from '../utils/Logger'

export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      comments: computed(() => AppState.comments)
    })
    return {
      state,
      async getOneComment(id) {
        try {
          // await commentsService.getOneComment(id)
        } catch (error) {
          logger.error(error)
        }
      },
      async deleteComment() {
        try {
          await commentsService.deleteComment(props.comment)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>
<style scoped>
.comment {
  color: black !important;
  text-decoration: none!important;
}
</style>
