<template>
  <el-container class="rose-bg-w rose-br-s1" :style="{ height: h + 'px' }">
    <el-header class="image-header rose-f-row">Header</el-header>
    <el-container>
    <ImageAside></ImageAside>
    <ImageMian></ImageMian>
    </el-container>
  </el-container>
</template>
<script setup>
import { onMounted, ref } from "vue";
import ImageAside from '@/components/ImageAside.vue';
import ImageMian from '@/components/ImageMian.vue';

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

</style>
