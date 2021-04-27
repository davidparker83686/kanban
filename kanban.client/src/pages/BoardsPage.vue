<template>
  <div class="col-12">
    <div class="row">
      <div class="boardsPage col-12 d-flex bg-danger justify-content-around mt-5">
        <h1>USER</h1>
        <button type="button" class="btn btn-primary new-board-button">
          Primary
        </button>
      </div>
    </div>
    <div class="row">
      <!-- CARDS GO HERE -->
      <div class="col-2 mx-3 bg-warning">
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h3 class="card-title">
              board.title
            </h3>
            <h5>board.creatorid</h5>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      <!-- CARDS GO HERE -->
      <div class="col-2 mx-3 bg-warning">
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h3 class="card-title">
              board.title
            </h3>
            <h5>board.creatorid</h5>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      <!-- CARDS GO HERE -->
      <div class="col-2 mx-3 bg-warning">
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h3 class="card-title">
              board.title
            </h3>
            <h5>board.creatorid</h5>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Boards'
}
</script>

<style lang="scss">
// .home{
// }
.new-board-button{
  max-height: 50px;
}
</style>
