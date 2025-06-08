<script setup>
import {computed, nextTick, ref, unref, watch} from 'vue'
import Iconify from '@purge-icons/generated'
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
// 更新 Iconify
const updateIcon = async (icon) => {
  if (unref(isLocal)) return

  const el = unref(elRef)
  if (!el) return

  await nextTick()

  if (!icon) return

  const svg = Iconify.renderSVG(icon, {})
  if (svg) {
    el.textContent = ''
    el.appendChild(svg)
  } else {
    const span = document.createElement('span')
    span.className = 'iconify'
    span.dataset.icon = icon
    el.textContent = ''
    el.appendChild(span)
  }
}


const props = defineProps({
  // icon name
  icon: {
    type: String,
    default: ''
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
    }
)
</script>

<template>
  <ElIcon :color="color" :size="size">
    <svg v-if="isLocal" aria-hidden="true">
      <use :xlink:href="symbolId"/>
    </svg>
    <span v-else ref="elRef" :class="$attrs.class" :style="getIconifyStyle">
      <span :data-icon="symbolId" class="iconify"></span>
    </span>
  </ElIcon>
</template>
