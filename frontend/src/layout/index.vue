<template>
  <div class="main-layout">
    <!-- 侧边栏-->
    <SideBar/>
  </div>
</template>

<script setup>
import SideBar from '@/layout/SideBar/index.vue';
</script>

<style lang="scss" scoped>
.main-layout {
  width: 100%;
  height: 100vh;
  box-sizing: border-box; // width 和 height 包含 padding 和 border，
}

</style>