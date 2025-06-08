<template>
  <div>
    <el-tabs
        v-model="tabsMenuValue"
        class="tabs-menu"
        closable
        type="card"
        @tab-change="changeTabsMenu"
        @tab-remove="removeTab"
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
import router from "@/router/index.js";
import {GlobalStore} from "@/stores/index.js";
import Icon from "@/components/Icon.vue";
import {useRoute} from "vue-router";
// 打开的标签页
const route = useRoute();
const tabsMenuValue = ref(route.path);
const globalStore = GlobalStore();
const tabsMenuList = computed(() => globalStore.tabsMenuList);

// 监控地址栏变化
watch(() => route.path, (newPath) => {
  try {
    // 路由变化时执行的逻辑，例如重新获取数据
    const tab = {
      icon: route.meta.icon,
      title: route.meta.title,
      path: route.path,
    };
    globalStore.addTabs(tab);
    // 切换标签页
    tabsMenuValue.value = newPath;
  } catch (error) {
    console.error('路由变化处理出错:', error);
  }
});

const changeTabsMenu = (path) => {
  // 切换标签页
  const fullPath = path;
  router.push(fullPath);
}

const removeTab = (path) => {
  // 关闭标签页
  globalStore.removeTabs(path, path === route.path);
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