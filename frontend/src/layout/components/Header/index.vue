<template>
  <div class="header">
    <div class="header-left">
      <Icon :class="['collapse-icon', { 'is-active': themeConfig.isCollapse }]"
            :size="24"
            icon="material-symbols-light:menu-open"
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