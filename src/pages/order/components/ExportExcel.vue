<template>
    <FormDrawer ref="formDrawerRef" title="导出订单" destroy-on-close confirmText="导出">
        111
    </FormDrawer>
</template>
<script setup>
import { ref } from 'vue';
import FormDrawer from '@/components/FormDrawer.vue';

const formDrawerRef = ref(null)

defineExpose({
    formDrawerRef
})

</script>
<style lang="less">
</style>