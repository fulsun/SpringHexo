<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="main-layout">
        <SideBar/>
      </el-aside>
      <el-container>
        <el-header>
          header
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import SideBar from '@/layout/SideBar/index.vue';
</script>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;

.common-layout {
  height: 100vb;
  width: 100vh;
  box-sizing: border-box; // width 和 height 包含 padding 和 border，
}

.main-layout {
  width: $sidebar-width;
  overflow-x: hidden;

}

</style>