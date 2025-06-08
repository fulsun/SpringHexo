<template>
  <template v-for="item in menuList" :key="item.path">
    <el-sub-menu
        v-if="item.children && item.children.length"
        :index="item.path"
    >
      <template #title>
        <Icon :icon="item.icon" :size="24"/>
        <span>{{ item.title }}</span>
      </template>
      <subMenu :menuList="item.children"/>
    </el-sub-menu>
    <el-menu-item v-else :index="item.path">
      <Icon :icon="item.icon" :size="24"/>
      <template #title>
        <span>{{ item.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup>
import {defineProps} from "vue";
import Icon from "@/components/Icon.vue";

defineProps({
  menuList: {
    type: Array,
    required: true
  }
});
</script>

<style lang="scss" scoped>

</style>