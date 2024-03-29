<template>
   <FormDrawer title="推广人" ref="formDrawer">
        111
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
<style lang="less" scoped>

</style>