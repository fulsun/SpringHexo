<template>
  <!-- 侧边栏菜单 -->
  <div class="side-bar-horizontal">
    <!-- 侧边栏顶部logo -->
    <div class="side-bar-header">
      <div class="side-bar-logo">
        <img alt="logo" src="@/assets/img/logo.png"> </img>
        <span>Hexo Admin</span>
      </div>
    </div>
    <!--侧边栏菜单-->
    <div :border="false" class="siderbar-menu-container">
      <el-menu default-active="/home" mode="vertical">
        <MenuItems></MenuItems>
      </el-menu>
    </div>
    <!-- 侧边栏菜单footer -->
    <SideBarFooter/>
  </div>

</template>

<script setup>
import {ref} from 'vue'
import MenuItems from "@/layout/SideBar/components/MenuItems.vue";
import SideBarFooter from "@/layout/SideBar/components/SideBarFooter.vue";

const props = defineProps({
  mode: {
    type: String,
    default: 'vertical'
  }
})
const sidebar = ref({
  opened: true
});

const toggleSideBar = () => {
  console.log('toggleSideBar')
  sidebar.value.opened = !sidebar.value.opened // 注意这里有两个修改
}
// 初始化菜单
const filteredRoutes = ref([])

const initSideMenus = async () => {
  const menusStore = useMenuStore()
  filteredRoutes.value = await menusStore.generateMenus()
}

</script>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;


.side-bar-horizontal {
  width: $sidebar-width;
  background-color: #fff;
  border-right: 1px solid var(--el-border-color);
  border-radius-left: 10px;

  .side-bar-header {
    height: $side-bar-header-height;
    border-bottom: 1px solid var(--el-border-color);

    .side-bar-logo {
      display: flex;
      align-items: center; // 垂直居中
      justify-content: center; // 水平居中

      img {
        width: 75px;
        height: $side-bar-header-height;
      }

      span {
        font-size: 20px;
        color: inherit !important;
      }
    }

  }


  .siderbar-menu-container {
    height: calc(100vh - #{$side-bar-header-height} - 130px); // 使用插值语法 #{}
    border-bottom: 1px solid var(--el-border-color);
    /* 方法1：精确选择器 */
    .el-menu--horizontal.el-menu {
      border-bottom: none !important;
    }

  }
}


</style>