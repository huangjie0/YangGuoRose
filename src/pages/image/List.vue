<template>
  <el-container class="rose-bg-w rose-br-s1" :style="{ height: h + 'px' }">
    <el-header class="image-header rose-f-row">Header</el-header>
    <el-container>
      <el-aside width="220px" class="image-aside rose-p-r">
            <div class="top rose-p-a-0">
                <el-scrollbar>
                    <div v-for="i in 100" :key="i">
                        {{ i }}
                    </div>
                </el-scrollbar>
            </div>
        <div class="bottom rose-f-row rose-f-c">分页部分</div>
      </el-aside>
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
    </el-container>
  </el-container>
</template>
<script setup>
import { onMounted, ref } from "vue";

const h = ref(null);

onMounted(() => {
  const wh = window.innerHeight || document.body.clientHeight;
  h.value = wh - 64 - 44 - 40;
});
</script>
<style lang="less">
.image-header {
  border-bottom: 1px solid var(--rose-g2);
  align-items: center;
}

.image-aside {
  border-right: 2px solid var(--rose-g2);
}

.image-aside .top,.image-main .top{
    bottom: 50px;
}

.image-aside .bottom,.image-main .bottom{
    position: absolute;
    bottom: 0;
    left:0;
    right:0;
    height: 50px;
} 

</style>
