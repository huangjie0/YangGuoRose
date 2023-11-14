<template>
  <el-main class="image-main rose-p-r">
    <div class="top rose-p-a-0">
      <el-scrollbar>
        <div v-for="i in 100" :key="i">
          {{ i }}
        </div>
      </el-scrollbar>
    </div>
    <div class="bottom rose-f-row rose-f-c">分页部分</div>
  </el-main>
</template>
<script setup>

</script>
<style lang="less">
.image-main .top{
  bottom: 50px;
}

.image-main .bottom{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
}

</style>
