<template>
  <div class="error-content">
    <div class="error-img">
    </div>
    <div class="error-info">
      <div class="title"> 404</div>
      <el-button class="return-home" type="primary" @click="$router.push('/')">Back to home</el-button>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.error-content {
  overflow: hidden;
  width: 890px;
  height: 360px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: 100px;


  .error-img {
    background: url('@/assets/img/404.png');
    background-size: cover; // 图片大小自适应
    width: 50%;
  }

  .error-info {
    display: flex;
    flex-direction: column;

    .title {
      user-select: none;
      font-weight: bold;
      font-size: 9em;
      color: #1f2d3d;
      margin-top: 30px;
    }

    .return-home {
      margin-top: 20px;
    }
  }
}
</style>