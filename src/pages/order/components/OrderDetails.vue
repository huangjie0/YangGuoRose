<template>
    <FormDrawer title="订单详情" ref="formDrawerRef">
        <el-card shadow="never">
            <template #header>
                <b>订单详情</b>
            </template>
            <el-form label-width="80px">
                <el-form-item label="订单号">
                    {{ info.no }}
                </el-form-item>
                <el-form-item label="付款方式">
                    {{ info.payment_method }}
                </el-form-item>
                <el-form-item label="付款时间">
                    {{ info.paid_time }}
                </el-form-item>
                <el-form-item label="创建时间">
                    {{ info.create_time }}
                </el-form-item>
            </el-form>
        </el-card>
        <el-card shadow="never">
            <template #header>
                <b>商品信息</b>
            </template>
            <div class="rose-f-row" v-for="(item,index) in info.order_items" :key="index"> 
                <el-image class="smallImage" :lazy="true" :src="item.goods_item?.cover ?? ''" fit="fill"></el-image>
            </div>
        </el-card>
        <el-card shadow="never" v-if="info.address">
            <template #header>
                <b>收货信息</b>
            </template>
            <el-form label-width="80px">
                <el-form-item label="收货人">
                    {{ info.address.name }}
                </el-form-item>
                <el-form-item label="联系方式">
                    {{ info.address.phone }}
                </el-form-item>
                <el-form-item label="收货地址">
                    {{ info.address.province + info.address.city + info.address.district + info.address.address }}
                </el-form-item>
            </el-form>
        </el-card>
    </FormDrawer>
</template>
<script setup>
import { ref } from 'vue';
import FormDrawer from '@/components/FormDrawer.vue';

const formDrawerRef = ref(null);

defineExpose({
    formDrawerRef
})

defineProps({
    info:Object
})

</script>
<style scoped lang="less">
.smallImage{
    width:50px;
    height:50px;
}
</style>