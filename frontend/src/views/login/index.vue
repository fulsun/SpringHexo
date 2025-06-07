<template>
  <div class="login-container">
    <div class="form">
      <span>Sign In</span>
      <el-form ref="loginFormRef" :model="loginForm" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model.trim="loginForm.username" placeholder="Account"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model.trim="loginForm.password"
              placeholder="Password"
              show-password
              type="password"
          />
        </el-form-item>
        <el-form-item>
          <el-switch v-model="isRemember" active-text="Remember me"/>
        </el-form-item>
        <el-form-item>
          <el-button
              :loading="loading"
              type="primary"
              @click="onLogin(loginFormRef)"
          >Sign In
          </el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {loginApi} from "@/http/modules/login.js";
import {GlobalStore} from "@/stores/index.js";
import router from "@/router/index.js";
import {getTimeState} from "@/utils/utils.js";

const isRemember = ref(false);
const loading = ref(false);
const loginForm = reactive({username: "", password: ""});
const globalStore = GlobalStore();

// 表单校验
const loginFormRef = ref();
const rules = reactive({
  username: [{required: true, message: "Please input Account"}],
  password: [{required: true, message: "Please input Password"}],
});

// 登录逻辑
const onLogin = (formEl) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (!valid) return;
    loading.value = true;
    try {
      const {data, code, message} = await loginApi(loginForm);
      if (code !== 200) {
        return ElMessage.error(message);
      }
      globalStore.setToken(data.token);
      router.push("/");
      ElNotification({
        title: getTimeState(),
        message: data.userInfo.username,
        type: "success",
        duration: 3000
      });
    } finally {
      loading.value = false;
    }
  });
};

</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
