<template>
  <div class="header">
    <div class="header-left">
      <el-icon :size="24" class="collapse-icon" @click="collapse">
        <component :is="themeConfig.isCollapse ? 'expand' : 'fold'"></component>
      </el-icon>
    </div>
    <div class="header-right">
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";
import {GlobalStore} from "@/stores";

const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig)

const collapse = () => {
  globalStore.themeConfig.isCollapse = !globalStore.themeConfig.isCollapse
}

</script>

<style lang="scss" scoped>
@use 'index.scss';
</style>