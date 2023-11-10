<template>
  <div class="chart">
    <el-card shadow="always">
      <template #header>
        <div class="rose-f1">
          <span>订单统计</span>
          <div>
            <el-check-tag :checked="checked == item.value" v-for="(item,index) in options" :key="index"  @change="onChange(item.value)"
              >{{ item.text }}</el-check-tag>
          </div>
        </div>
      </template>
      <div id="chartId">
      </div>
    </el-card>
  </div>
</template>
<script setup>
import * as echarts from 'echarts';
import { ref , onMounted , onBeforeUnmount } from 'vue';
import { getStatistics3 } from '@/api/index.js';
import { useResizeObserver } from '@vueuse/core';

const checked = ref('week')

const options = ref([
  {
    text: "近一个月",
    value: "month",
  },
  {
    text: "近一个周",
    value: "week",
  },
  {
    text: "近24小时",
    value: "hour",
  },
])

const onChange = (type)=>{
    checked.value = type
    getData()
}
 
var myChart = null
onMounted(()=>{
    var chartDom = document.getElementById('chartId');
    myChart = echarts.init(chartDom);
    getData()
})

function getData() {
    let option = {
    xAxis: {
        type: 'category',
        data:[]
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
        data:[],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
        }
        }
    ]
    };
    myChart.showLoading()
    getStatistics3(checked.value).then((res)=>{
        option.xAxis.data = res.x
        option.series[0].data = res.y
        myChart.setOption(option)
    }).finally(()=>{
        myChart.hideLoading()
    })
}

onBeforeUnmount(()=>{
    if(myChart) echarts.dispose(myChart)
})

// useResizeObserver(el, (entries) => {
//       const entry = entries[0]
//       const { width, height } = entry.contentRect
//       text.value = `width: ${width}, height: ${height}`
// })



</script>
<style lang="less">
.chart{
    margin-top:20px;
}

#chartId{
    width: 100%;
    height: 300px;
}

</style>
