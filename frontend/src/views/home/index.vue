<template>
  <div class="home-container">
    <el-card class="userInfo-card" :shadow="false">
      <el-avatar :size="100" :src="userInfo.avatar"/>
      <div class="userInfo">
        <h4>{{ hello }}！</h4>
        <p>今日天气晴朗，气温在15℃至25℃之间，东南风。 </p>
      </div>
    </el-card>

    <div class="sunmmary-info">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item,index in summary" :key="index" shadow="hover">
          <el-card shadow="hover">
            <template #header>
              <div class="card-header">
                <span>{{ item.name }}</span>
                <el-tag :type="item.tagType">{{ item.unit }}</el-tag>
              </div>
            </template>
            <div class="card-body">
              <p>{{ item.total }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="chart-info">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <template #header>
              <div class="card-header">
              </div>
              </template>
            <LineChart :options="chartOptions" :loading="loading" />
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-calendar  />
        </el-col>
        <el-col :span="6">
          <el-card>
            最新动态
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref, watch} from 'vue';
import {GlobalStore} from "@/stores/index.js";
import {getTimeState} from "@/utils/utils.js";
import {computed, reactive} from "vue";
import LineChart   from "@/components/LineChart.vue";

const globalStore = GlobalStore();
const {userInfo} = globalStore;
const summary = reactive([
  {
    "name": "总文章数",
    "total": 0,
    "tagType": "success",
    "unit": "篇"
  }, {
    "name": "草稿数",
    "total": 0,
    "tagType": "primary",
    "unit": "篇"
  }, {
    "name": "总分类数",
    "total": 0,
    "tagType": "warning",
    "unit": "个"
  }, {
    "name": "总标签数",
    "total": 0,
    "tagType": "danger",
    "unit": "个"
  }
])

const hello = computed(() => {
  return getTimeState() + " ," + userInfo.username;
});

const loading = ref(false);

const chartOptions = ref({
  title: {
    text: '访问趋势'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['浏览量(PV)', '访问量（UV）']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '访问量（UV）',
      type: 'line',
      stack: 'x',
      areaStyle: {},
      smooth: true,
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '浏览量(PV)',
      type: 'line',
      stack: 'x',
      areaStyle: {},
      smooth: true,
      data: [220, 182, 191, 234, 290, 330, 310]
    }
  ]
});

</script>

<style lang="scss" scoped>
$color-primary: #807a7c;

.home-container {
  // 避免水平方向的滚动条
  overflow: hidden;

  height: 100%;

  .userInfo-card {
    margin-top: 10px;
    padding-left: 10px;

    :deep(.el-card__body) {
      display: flex;
      align-items: center;

      .userInfo {
        margin-left: 20px;

        h4 {
          font-weight: bold;
          padding-bottom: 20px;
        }

        p {
          color: $color-primary
        }

      ;
      }
    }


  }

  .sunmmary-info {
    margin-top: 20px;

    .card-header {
      color: $color-primary;
      font-weight: bold;
      padding: 5px;
      font-size: 16px;
      display: flex;
      justify-content: space-between;

      :deep(.el-tag__content) {
        font-size: 1.2em;

      }

    }

    .card-body {
      display: flex;
      justify-content: center;
      margin-top: 10px;
      font-size: 33px;
    }

  }

  .chart-info {
    margin-top: 20px;

    :deep(.el-calendar) {
        font-size: 14px;
        .next {
          border: none;
        }
        td {
          border: none;
        }
        .el-calendar-day {
          height: 45px !important;
          text-align: center;
          border: none;
        }
        .el-calendar__header {
          justify-content: space-between;
        }
        .is-selected {
          background-color: #1d8dd8;
          color: #fff;
        }
    }
  }
}
</style>