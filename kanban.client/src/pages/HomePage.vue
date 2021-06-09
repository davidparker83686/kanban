<template>
  <div class="container-fluid super-light-green">
    <div class="home row justify-content-center">
      <div class="col-11 m-5">
        <span class="dark-blue-text text-left">A Kanban board is a method for managing the creation of products with an emphasis on continual delivery while not overburdening the development team. Like Scrum, Kanban is a process designed to help teams work together more effectively. This application will provide users with a digital Kanban board, where they can manage several lists of tasks for each board.</span>
      </div>
      <div class="col-11 d-flex justify-content-start">
        <img class="img-fluid " src="../assets/img/marvin-meyer-SYTO3xs06fU-unsplash.jpg" alt="KanBan Fun">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
