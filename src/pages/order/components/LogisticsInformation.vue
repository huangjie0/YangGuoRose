<template>
    <FormDrawer ref="formDrawerRef" title="物流信息">
        222
    </FormDrawer>
</template>
<script setup>
import { ref,watch } from 'vue';
import FormDrawer from '@/components/FormDrawer.vue';
import { getShipInfo } from '@/api/order.js';

const formDrawerRef = ref(null);

defineExpose({
    formDrawerRef
})

const props = defineProps({
    orderId:Number
})

watch(()=>props.orderId,()=>{
    getShipInfo(props.orderId).then(res=>{
        console.log(res);
    }).finally(()=>{
    })
})

</script>
<style lang="less" scoped>

</style>