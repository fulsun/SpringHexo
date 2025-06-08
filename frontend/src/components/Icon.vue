<script setup>
import {computed, nextTick, ref, unref, watch} from 'vue'
import Iconify from "@iconify/iconify";
// 判断是否是本地图标
const isLocal = computed(() => props.icon.startsWith('svg-icon:'))

// 如果是本地图标拆分出 svg-icon: 后面的字段
const symbolId = computed(() => {
  return unref(isLocal) ? `#icon-${props.icon.split('svg-icon:')[1]}` : props.icon
})


const elRef = ref(null)
// 设置 Iconify 样式
const getIconifyStyle = computed(() => {
  const {color, size} = props
  return {
    fontSize: `${size}px`,
    color
  }
});

// 更新 Iconify 图标
const updateIcon = async (icon) => {
  if (unref(isLocal)) return;   // 如果是本地图标 则不更新
  const el = unref(elRef);
  if (!el) {
    return;  // 如果 el 还没挂载 则不更新
  }
  await nextTick();  // 等待下一帧
  if (!icon) {
    // 如果 icon 为空 则不更新
    return;
  }
  // 修正：使用 renderSVG 替代不存在的 createIcons
  const svg = Iconify.renderSVG(icon);
  if (svg) {  // 如果 svg 存在 则更新
    el.textContent = ''; // 清空内容
    el.appendChild(svg); // 追加 svg
  } else {  // 如果 svg 不存在 则创建 span 标签
    const span = document.createElement('span');
    span.className = 'iconify';
    span.dataset.icon = icon;
    el.textContent = '';
    el.appendChild(span);
  }
};


const props = defineProps({
  // icon name
  icon: {
    type: String,
    default: '',
    required: true
  },
  // icon color
  color: {
    type: String,
    default: ''
  },
  // icon size
  size: {
    type: Number,
    default: 16
  }
})

watch(
    () => props.icon,
    (icon) => {
      updateIcon(icon)
    },
    {immediate: true}  // 添加立即执行选项
)
</script>

<template>
  <ElIcon :color="color" :size="size">
    <svg v-if="isLocal" aria-hidden="true">
      <use :xlink:href="symbolId"/>
    </svg>
    <!-- 合并嵌套span，直接使用外层span作为iconify容器 -->
    <span v-else ref="elRef" :class="$attrs.class" :data-icon="symbolId" :style="getIconifyStyle"
          class="iconify"></span>
  </ElIcon>
</template>
