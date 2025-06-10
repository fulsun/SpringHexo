<template>
  <div ref="chartRef" :style="{ width, height }"></div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref, watch} from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  options: {
    type: Object,
    required: true
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '400px'
  },
  theme: {
    type: String,
    default: ''
  },
  initOptions: {
    type: Object,
    default: () => ({})
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingOptions: {
    type: Object,
    default: () => ({})
  }
});

const chartRef = ref(null);
let chartInstance = null;

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return;

  chartInstance = echarts.init(chartRef.value, props.theme, props.initOptions);
  chartInstance.setOption(props.options);

  if (props.loading) {
    chartInstance.showLoading(props.loadingOptions);
  } else {
    chartInstance.hideLoading();
  }
};

// 更新图表
const updateChart = () => {
  if (!chartInstance) return;

  chartInstance.setOption(props.options);

  if (props.loading) {
    chartInstance.showLoading(props.loadingOptions);
  } else {
    chartInstance.hideLoading();
  }
};

// 监听窗口变化，重新调整图表大小
const resizeChart = () => {
  chartInstance?.resize();
};

// 添加事件监听器
const addEventListener = () => {
  window.addEventListener('resize', resizeChart);
};

// 移除事件监听器
const removeEventListener = () => {
  window.removeEventListener('resize', resizeChart);
};

// 销毁图表
const disposeChart = () => {
  if (!chartInstance) return;
  removeEventListener();
  chartInstance.dispose();
  chartInstance = null;
};

onMounted(() => {
  initChart();
  addEventListener();
});

onBeforeUnmount(() => {
  disposeChart();
});

// 监听options变化
watch(() => props.options, () => {
  updateChart();
}, {deep: true});

// 监听loading状态变化
watch(() => props.loading, (newVal) => {
  if (!chartInstance) return;
  if (newVal) {
    chartInstance.showLoading(props.loadingOptions);
  } else {
    chartInstance.hideLoading();
  }
});

// 暴露图表实例和方法
defineExpose({
  chartInstance,
  resizeChart,
  disposeChart
});
</script>