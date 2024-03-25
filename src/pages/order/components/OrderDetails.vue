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

        <el-card shadow="never" v-if="info.ship_data">
            <template #header>
                <b>发货信息</b>
            </template>
            <el-form label-width="80px">
                <el-form-item label="物流公司">
                    {{ info.ship_data.express_company }}
                </el-form-item>
                <el-form-item label="运单号">
                    {{ info.ship_data.express_no }}
                </el-form-item>
                <el-form-item label="发货时间">
                    {{ ship_time }}
                </el-form-item>
            </el-form>
        </el-card>




        <el-card shadow="never">
            <template #header>
                <b>商品信息</b>
            </template>
            <div class="rose-f-row" v-for="(item,index) in info.order_items" :key="index"> 
                <el-image class="smallImage" :lazy="true" :src="item.goods_item?.cover ?? ''" fit="fill"></el-image>
                <div class="rose-ml-1">
                    <p>{{ item.goods_item?.title ?? '商品已被删除' }}</p>
                    <p v-if="item.sku">
                        <el-tag size="small" type="info">
                            {{ item.sku }}
                        </el-tag>
                    </p>
                    <p>
                        <b class="rose-font-red">￥{{ item.price }}</b>
                        <span>x{{ item.num }}</span>
                    </p>
                </div>
            </div>
            <el-form label-width="80px">
                <el-form-item label="成交价">
                    <span class="rose-font-red">￥{{ info.total_price }}</span> 
                </el-form-item>
            </el-form>
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
        <el-card shadow="never" v-if="info.refund_status !== 'pending'">
            <template #header>
                <b>退款信息</b>
                <el-button disabled class="rose-ml-1">{{ refund_status }}</el-button>
            </template>
            <el-form label-width="80px">
                <el-form-item label="退款理由">
                    {{ info.extra.refund_reason }}
                </el-form-item>
            </el-form>
        </el-card>
    </FormDrawer>
</template>
<script setup>
import { ref , computed} from 'vue';
import FormDrawer from '@/components/FormDrawer.vue';
import { useDateFormat } from '@vueuse/core';

const formDrawerRef = ref(null);
const ship_time = computed(()=>{
    if(props.info.ship_data){
       const s = useDateFormat(props.info.ship_data.express_time * 1000,'YYYY-MM-DD')
       return s.value
    }
    return ""
})

const refund_status = computed(()=>{
    const opt = {
        pending:"未退款",
        applied:"已申请,等待审核",
        processing:"退款中",
        success:"退款成功",
        failed:"退款失败"
    }
    return props.info.refund_status ? opt[props.info.refund_status] : ""
})

defineExpose({
    formDrawerRef
})

const props = defineProps({
    info:Object
})

</script>
<style scoped lang="less">
.smallImage{
    width:50px;
    height:50px;
}
</style>