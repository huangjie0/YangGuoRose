<template>
  <el-container class="rose-bg-w rose-br-s1" :style="{ height: h + 'px' }">
    <el-header class="image-header rose-f-row">
      <el-button type="primary" size="small" @click="handleOpenCreate">新增图片分类</el-button>
    </el-header>
    <el-container>
    <ImageAside ref="imageAsideRef" @change="handleChange"></ImageAside>
    <ImageMian ref="imageMainRef"></ImageMian>
    </el-container>
  </el-container>
</template>
<script setup>
import { onMounted, ref } from "vue";
import ImageAside from '@/components/ImageAside.vue';
import ImageMian from '@/components/ImageMian.vue';

const h = ref(null);
const imageAsideRef = ref(null);
const imageMainRef = ref(null);

const handleOpenCreate = () => {
  imageAsideRef.value.handleCreate()
}

onMounted(() => {
  const wh = window.innerHeight || document.body.clientHeight;
  h.value = wh - 64 - 44 - 40;
});

const handleChange = (id)=>{
  imageMainRef.value.loadData(id)
}

</script>
<style lang="less">
.image-header {
  border-bottom: 1px solid var(--rose-g2);
  align-items: center;
}

</style>
