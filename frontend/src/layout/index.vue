<template>
  <el-container class="layout column">
    <el-aside class="left-layout">
      <SideBar/>
    </el-aside>
    <el-container class="right-layout">
      <el-header class="header-layout">
        <Header/>
      </el-header>
      <el-main class="main-layout">Main</el-main>
      <el-footer class="footer-layout">
        <SideBarFooter/>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
import SideBar from '@/layout/SideBar/index.vue';
import SideBarFooter from "@/layout/SideBar/components/SideBarFooter.vue";
import Header from "@/layout/components/Header/index.vue";
</script>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;

.common-layout {
  height: 100vh;
  width: 100%;
  box-sizing: border-box; // width 和 height 包含 padding 和 border，
}

/* 左侧边栏 */
.left-layout {
  width: $sidebar-width;
  overflow-x: hidden;
}

/* 右侧内容 */
.right-layout {
  width: auto;
  height: 100vh;
}

.header-layout {
  height: $side-bar-header-height;
  padding: 0;
  overflow: hidden;
}

.main-layout {
  height: 900px;
}

.footer-layout {
  height: 100px;
  padding: 0;
  overflow: hidden;
}

</style>