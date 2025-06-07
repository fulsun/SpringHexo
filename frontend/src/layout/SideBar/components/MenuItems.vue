<template>
  <div class="menu-container">
    <el-menu :router="true" default-active="/home" mode="vertical">
      <!-- 遍历菜单项 -->
      <template v-for="item in menu.menuItems" :key="item.id">
        <!-- 有子菜单的情况：使用 el-sub-menu -->
        <el-sub-menu
            v-if="item.children && item.children.length"
            :index="item.path"
        >

          <template #title>
            <SvgIcon :name="item.icon"/>
            <span>{{ item.name }}</span>
          </template>

          <!-- 子菜单项 -->
          <el-menu-item
              v-for="child in item.children"
              :key="child.id"
              :index="child.path"
              :route="{ path: child.path }"
          >
            <SvgIcon :name="child.icon"/>
            <span>{{ child.name }}</span>
          </el-menu-item>
        </el-sub-menu>
        <!-- 没有子菜单的情况：直接使用 el-menu-item -->
        <el-menu-item
            v-else
            :index="item.path"
            :route="{ path: item.path }"
        >
          <SvgIcon :name="item.icon"/>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>

  </div>
</template>

<script setup>
import {onMounted, reactive} from 'vue'
import request from "@/utils/request";
import SvgIcon from "@/components/SvgIcon.vue";

const menu = reactive({
  menuItems: [],
});

const initMenuItems = async () => {
  const response = await request.get('/api/getMenuItems');
  menu.menuItems = response.menu;

};

onMounted(() => {
  initMenuItems()
})
</script>


<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;

.menu-container {
  user-select: none;

  .el-menu {
    border-right: none !important; /* 移除所有边框 */
  }

  .el-menu-item {
    font-size: 16px;
  }

  .el-menu-item {
    font-size: 16px;
  }

  .el-sub-menu__title span {
    font-size: 16px;
  }
}
</style>