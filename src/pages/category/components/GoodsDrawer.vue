<template>
<FormDrawer ref="formDrawer" title="推荐商品">
    
</FormDrawer>
</template>
<script setup>
import { ref } from 'vue';
import FormDrawer from '@/components/FormDrawer.vue';

const formDrawer = ref(null);

defineExpose({
    formDrawer
})
</script>
<style lang="less">


</style>