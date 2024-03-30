<template>
    <div v-loading="loading" class="rose-bg-w rose-br-s1">
        <el-form :model="form" label-width="160px">
            <div class="roser-bg-g base-setting rose-br-s1">基础设置</div>

            <el-form-item label="分销启用">
                <el-radio-group v-model="form.distribution_open">
                    <el-radio :label="0" border>关闭</el-radio>
                    <el-radio :label="1" border>开启</el-radio>
                </el-radio-group>
            </el-form-item>
            
            <el-form-item label="分销海报图">
                
            </el-form-item>


            <div class="roser-bg-g base-setting rose-br-s1">返佣设置</div>

            <el-form-item label="一级返佣比例">
                <el-input v-model="form.store_first_rebate" style="width: 300px;" placeholder="请输入一级返佣比例" type="number">
                    <template #append>%</template>
                </el-input>
                <small class="rose-ml-1 rose-bg2">订单交易成功后给上级返佣的比例0 - 100，例：5 = 反订单金额的5%</small>
            </el-form-item>
            <el-form-item label="二级返佣比例">
                <el-input v-model="form.store_second_rebate" style="width: 300px;" placeholder="请输入二级返佣比例" type="number">
                    <template #append>%</template>
                </el-input>
                <small class="rose-ml-1 rose-bg2">订单交易成功后给上级返佣的比例0 - 100，例：5 = 反订单金额的5%</small>
            </el-form-item>
            <el-form-item label="自购返佣">
                <el-radio-group v-model="form.is_self_brokerage">
                    <el-radio :label="1" border>是</el-radio>
                    <el-radio :label="0" border>否</el-radio>
                </el-radio-group>
                <small class="rose-ml-1 rose-bg2">是否开启自购返佣（开启：分销员自己购买商品，享受一级返佣，上级享受二级返佣：关闭：分销员自己购买商品没有返佣）</small>
            </el-form-item>

            <div class="roser-bg-g base-setting rose-br-s1">结算设置</div>

            <el-form-item label="结算时间">
                <el-input v-model="form.settlement_days" style="width: 300px;" placeholder="请输入结算时间" type="number">
                    <template #prepend>订单完成后</template>
                    <template #append>天</template>
                </el-input>
                <small class="rose-ml-1 rose-bg2">预估佣金结算后无法进行回收，请谨慎设置结算天数</small>
            </el-form-item>

            <el-form-item label="佣金到账方式">
                <el-radio-group v-model="form.brokerage_method">
                    <el-radio label="hand" border>手动到账</el-radio>
                    <el-radio label="wx" border>自动到微信零钱</el-radio>
                </el-radio-group>
                <small class="rose-ml-1 rose-bg2">佣金到账方式支持线下转账和微信零钱自动转账，手动转账更安全，自动转账更方便</small>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { toast } from '@/composables/util.js';
import { ref, reactive } from 'vue';
import { getConfig,setConfig } from '@/api/distribution.js';

const loading = ref(false);
const getData = ()=>{
    loading.value = true
    getConfig().then(res=>{
        for (const k in form) {
            form[k] = res[k]
        }
    }).finally(()=>{
        loading.value = false
    })
}

const form = reactive({
    distribution_open: 1, 
    store_first_rebate:10, 
    store_second_rebate:20,
    spread_banners:[
        "http://...png",
        // ...
    ],
    is_self_brokerage:1,
    settlement_days:7,
    brokerage_method:"hand"
})

const submit = ()=>{
    loading.value = true;
    setConfig(form).then(res=>{
        toast("修改成功！")
        getData()
    }).finally(()=>{
        loading.value = false;
    })
}

getData()

</script>
<style lang="less">
.base-setting{
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 0 0 5px;
    font-size: var(--common-split6);
}
</style>
