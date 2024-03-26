<template>
    <FormDrawer ref="formDrawerRef" title="物流信息" :destroy-on-close="true" @closed="closed" confirmText="确定" @submit="submit">
        <el-card shadow="never">
            <div class="rose-f-row">
                <el-image :src="info.logo" fit="fill" :lazy="true" class="smallImage rose-br-s1"></el-image>
                <div>
                    <p>物流公司：{{ info.typename }}</p>
                    <p>物流单号：{{ info.number }}</p>
                </div>
            </div>
        </el-card>
        <el-card shadow="never">
            <el-timeline>
                <el-timeline-item :timestamp="item.time" placement="top" v-for="(item,index) in info.list" :key="index">
                    {{ item.status }}
                </el-timeline-item>
            </el-timeline>
        </el-card>
    </FormDrawer> 
</template>
<script setup>
import { ref,watch } from 'vue';
import FormDrawer from '@/components/FormDrawer.vue';
import { getShipInfo } from '@/api/order.js';
import { toast } from '@/composables/util.js';

const formDrawerRef = ref(null);
const info = ref({});

defineExpose({
    formDrawerRef
})

const props = defineProps({
    orderId:Number
})

watch(()=>props.orderId,()=>{
    if(props.orderId !== null){
        getShipInfo(props.orderId).then(res=>{
            if(res.status !== 0){
                return toast(res.msg,'error')
            }
            info.value = res.result
        })
    }
})

const emits = defineEmits(["closed"])

const closed = ()=>{
    emits("closed")
}

const submit = ()=>{
    formDrawerRef.value.close()
}

</script>
<style lang="less" scoped>
.smallImage{
    width:50px;
    height:50px;
}
</style>