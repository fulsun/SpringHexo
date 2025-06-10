<template>
  <div class="markdown-body" @click.prevent.stop>
    <div id="markdown-container"></div>
  </div>
</template>

<script setup>
import 'cherry-markdown/dist/cherry-markdown.css';
import 'cherry-markdown/dist/cherry-markdown.min.js';
import Cherry from 'cherry-markdown';
import * as echarts from 'echarts';
import echartsEngine from 'cherry-markdown/dist/addons/advance/cherry-table-echarts-plugin';
import {onMounted} from 'vue';
import mermaidPlugin from 'cherry-markdown/dist/addons/cherry-code-block-mermaid-plugin';
import mermaid from 'mermaid';

Cherry.usePlugin(mermaidPlugin, {mermaid});
Cherry.usePlugin(echartsEngine, {echarts});

function afterChange(md, html) {
  console.log(md);
  console.log(html);
}

function onCopyCode(e, code) {
  return '```\n' + code + '\n```';
}


onMounted(() => {
  const cherry = new Cherry({
    id: 'markdown-container',
    value: '# welcome to cherry editor!',
  });
  cherry.on('afterChange', afterChange);
  cherry.on('onCopyCode', onCopyCode);
});


</script>

<style scoped>
.markdown-body {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

#markdown-container {
  flex: 1;
}
</style>