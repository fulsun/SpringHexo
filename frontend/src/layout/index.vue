<template>
  <el-container class="layout column">
    <el-header class="header-layout">
      <span>Hexo Admin</span>
      <Header/>
    </el-header>
    <el-container class="column-inner">
      <el-aside :width="isCollapse ? '65px' : '200px'">
        <el-scrollbar>
          <el-menu
              :collapse="isCollapse"
              :collapse-transition="false"
              :default-active="activePath"
              router
              unique-opened
          >
            <subMenu :menuList="menuList"/>
          </el-menu>
        </el-scrollbar>
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
import {computed, ref, watch} from "vue";
import Header from "@/layout/components/Header/index.vue";
import SubMenu from "@/layout/components/Menu/SubMenu.vue";
import {GlobalStore} from "@/stores";
import {useMenuStore} from "@/stores/modules/menu";
import {useRoute} from "vue-router";


const globalStore = GlobalStore();
const menuStore = useMenuStore();
const isCollapse = computed(() => globalStore.themeConfig.isCollapse);
const activePath = ref();
const menuList = computed(() => menuStore.authMenuList);
const route = useRoute();

// 监听路由的变化（防止浏览器后退/前进activePath不变化 ）
watch(
    () => route.fullPath,
    () => {
      activePath.value = route.fullPath;
    },
    {
      immediate: true, // 立即执行一次
    }
);
</script>

<style lang="scss" scoped>
@use "index.scss";

</style>