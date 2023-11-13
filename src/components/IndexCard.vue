<template>
  <div class="chart">
    <el-card shadow="always">
      <template #header>
        <div class="rose-f1">
          <span class="rose-font-s2">{{ title }}</span>
          <el-tag type="danger" effect="plain">
            {{ tip }}
          </el-tag>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item,index) in btns" :key="index">
          <el-card>
            <div class="rose-f-column rose-f-c">
              <span class="rose-font-s2">{{ item.value }}</span>
              <span class="text">{{ item.label }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script setup>

defineProps({
  title: String,
  tip: String,
  btns: Array
});

</script>
<style lang="less">
.chart{
    margin-top:var(--common-split);
    .text{
        margin-top:var(--common-split);
    }
}
</style>
