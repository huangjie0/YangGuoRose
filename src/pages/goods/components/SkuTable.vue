<template>
    <el-form-item label="规格设置">
        <table border>
            <thead>
                <tr>
                    <th v-for="(th,thi) in tableThs" :key="thi" :width="th.width" :rowspan="th.rowspan" :colspan="th.colspan">
                        {{ th.name }} 
                    </th>
                </tr>
                <tr>
                    <th v-for="(th,thi) in skuLables" :key="thi">
                        {{ th.name }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <!-- <tr>
                    <td></td>
                </tr> -->
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