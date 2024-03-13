<template>
    <el-form-item label="规格设置">
        <table class="border">
            <thead>
                <tr>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
    </el-form-item>
</template>
<script setup>
import { initSkuTable } from '@/composables/useSku.js';

const { skuLables,tableThs,sku_list } = initSkuTable();

</script>
<style lang="less" scoped>
</style>