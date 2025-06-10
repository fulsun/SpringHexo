<template>
  <!--  <MdEditor v-model="text"/>-->
  文章管理
</template>

<script setup>
import {ref} from 'vue';
import 'md-editor-v3/lib/style.css';

const text = ref('Hello Editor!');
</script>
