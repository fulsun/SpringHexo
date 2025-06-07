<template>
  <el-container class="layout column">
    <el-header class="header-layout">
      <span>Hexo Admin</span>
      <Header/>
    </el-header>
    <el-container class="column-inner">
      <el-aside :width="isCollapse ? '65px' : '200px'">
        <SideBar/>
      </el-aside>
      <el-container>
        <el-main>Main</el-main>
        <el-footer>
          footer
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup>
import SideBar from '@/layout/SideBar/index.vue';
import Header from "@/layout/components/Header/index.vue";
</script>

<style lang="scss" scoped>
@use "index.scss";

</style>