<template>
  <div class="sidebar-footer">
    <div class="item-headline">
      <SvgIcon name="chart-line"/>
      <span>网站信息</span>
    </div>

    <div class="webinfo">
      <div class="webinfo-item">
        <div class="item-name">文章数目 :</div>
        <div class="item-count">{{ siteInfo.articleCount }}</div>
      </div>
      <div class="webinfo-item">
        <div class="item-name">运行时间 :</div>
        <div id="runtimeshow" class="item-count" data-publishdate="2019-08-12T00:00:00.000Z">{{ siteInfo.runTime }}
        </div>
      </div>
      <div class="webinfo-item">
        <div class="item-name">本站访客数 :</div>
        <div id="busuanzi_value_site_uv" class="item-count">{{ siteInfo.visitorCount }}</div>
      </div>
      <div class="webinfo-item">
        <div class="item-name">本站总浏览量 :</div>
        <div id="busuanzi_value_site_pv" class="item-count">{{ siteInfo.totalViewCount }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import SvgIcon from "@/components/SvgIcon.vue";

const siteInfo = reactive({
  articleCount: 0,
  runTime: '0天',
  visitorCount: 0,
  totalViewCount: 0
})
</script>
<style lang="scss" scoped>
.sidebar-footer {
  min-height: 123px;
  padding: 5px 10px 0;
  font-size: 1em;
  color: #595756;
  overflow: hidden;

  .item-headline {
    text-align: left;
  }

  .webinfo {
    padding-top: 5px;
    font-size: 1em;
    display: flex;
    flex-direction: column;

    .webinfo-item {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>