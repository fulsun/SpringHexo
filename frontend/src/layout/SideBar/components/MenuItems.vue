<template>
  <div class="menu-container">
    <el-menu-item v-for="item in menu.menuItems"
                  :key="item.id"
                  :index="item.path"
                  :route="{ path: item.path }"
    >
      <el-icon v-if="item.icon">
        <component :is="item.icon"/>
      </el-icon>
      {{ item.name }}
    </el-menu-item>
  </div>
</template>

<script setup>
import {onMounted, reactive} from 'vue'

import request from "@/utils/request";

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
}
</style>