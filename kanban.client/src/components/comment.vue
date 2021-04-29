<template>
  <div class="row justify-content-center">
    <div class="col-10 d-flex px-2 justify-content-center my-2">
      <div class="card shadow " style="width: 18rem;cursor: pointer">
        <div class="card-body">
          <div class="d-flex justify-content-end">
            <button class="btn text-danger" @click="deleteComment()">
              X
            </button>
          </div>
          <!-- <router-link :to="{name: 'BoardsDetails', params: {id: board.id}}"> -->
          <div class="d-flex justify-content-center">
            <h3 class="card-title comment">
              {{ (comment.body).toUpperCase() }}
            </h3>
            <h5>{{ comment.creatorid }}</h5>
          </div>
        <!-- </router-link> -->
        </div>
      </div>
    </div>
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
