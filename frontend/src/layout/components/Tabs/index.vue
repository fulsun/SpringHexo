<template>
  <div>
    <el-tabs
        v-model="tabsMenuValue"
        class="tabs-menu"
        type="card"
        @tab-click="changeTabsMenu"
        @tab-change=""
        @tab-remove=""
    >
      <el-tab-pane
          v-for="(item, index) in tabsMenuList"
          :key="index"
          :label="item.title"
          :name="item.path">
        <template #label>
        <span class="custom-tabs-label">
          <Icon :icon="item.icon"/>
          <span>{{ item.title }}</span>
        </span>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import {computed, ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import router from "@/router/index.js";
import {GlobalStore} from "@/stores/index.js";
import Icon from "@/components/Icon.vue";
// 打开的标签页
const tabsMenuValue = ref();
const route = useRoute();
const globalStore = GlobalStore();
const tabsMenuList = computed(() => globalStore.tabsMenuList);


// 监控地址栏变化
watch(() => route.path, (newVal) => {
  const tab = {
    icon: route.meta.icon,
    title: route.meta.title,
    path: route.path,
  };
  globalStore.addTabs(tab);

});

const changeTabsMenu = (path) => {
  // 切换标签页
  router.push(path);
}
</script>

<style lang="scss" scoped>
.tabs-menu > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.tabs-menu .custom-tabs-label {
  display: flex;
  align-items: center;
  vertical-align: middle;

  > span {
    display: inline-block;
    margin-left: 4px;
  }
}

</style>