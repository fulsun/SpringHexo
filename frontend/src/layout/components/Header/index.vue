<template>
  <div class="header">
    <div class="header-left">
      <Icon :class="['collapse-icon', { 'is-active': themeConfig.isCollapse }]"
            :size="24"
            icon="material-symbols-light:menu-open"
            @click="collapse"/>
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item
            v-for="(item, index) in breadcrumbList"
            :key="item.path"
            :to="index === breadcrumbList.length - 1 ? null : item.path"
        >
          <div class="inner-item">
            <Icon :icon="item.icon" :size="16"/>
            <span>{{ item.title }}</span>
          </div>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header-right">
      <span>{{ userInfo.username }}</span>
      <el-dropdown trigger="hover">
        <el-avatar
            :size="40"
            :src="userInfo.avatar"
            class="avatar"
            fit="cover"
            icon="UserFilled"
        />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <a href="/profile">个人中心</a>
            </el-dropdown-item>
            <el-dropdown-item @click="loginOut">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";
import {GlobalStore} from "@/stores";
import Icon from "@/components/Icon.vue";
import {useMenuStore} from "@/stores/modules/menu";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();
const globalStore = GlobalStore()
const menuStore = useMenuStore();
const themeConfig = computed(() => globalStore.themeConfig)
const breadcrumbList = computed(
    () => {
      // 获取前激活的最底层子路由
      const match = route.matched[route.matched.length - 1];
      // 获取当前激活的菜单
      return menuStore.breadcrumbList[match.path]
    }
);
const collapse = () => {
  globalStore.themeConfig.isCollapse = !globalStore.themeConfig.isCollapse
}
const userInfo = computed(() => globalStore.userInfo);

// 退出登录
const loginOut = () => {
  ElMessageBox.confirm("是否确认退出登录", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    globalStore.setToken("");
    router.replace("/login");
  }).catch(() => {
  });
};
</script>

<style lang="scss" scoped>
@use 'index.scss';
</style>