<template>
  <div class="header">
    <div class="header-left">
      <Icon :icon="themeConfig.isCollapse ? 'ep:expand' : 'ep:fold'" :size="24" class="collapse-icon"
            @click="collapse"/>
    </div>
    <div class="header-right">
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";
import {GlobalStore} from "@/stores";
import Icon from "@/components/Icon.vue";

const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig)

const collapse = () => {
  globalStore.themeConfig.isCollapse = !globalStore.themeConfig.isCollapse
}

</script>

<style lang="scss" scoped>
@use 'index.scss';
</style>