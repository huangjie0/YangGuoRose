<template>
    <el-form-item label="规格设置">
        <table>
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
                <tr v-for="(item,index) in sku_list " :key="index">
                    <td v-for="(sku,index) in item.skus" :key="index">{{ sku.value }}</td>
                    <td>
                        <el-input v-model="item.pprice" size="small" type="number"></el-input>
                    </td>
                    <td>
                        <el-input v-model="item.oprice" size="small" type="number"></el-input>
                    </td>
                    <td>
                        <el-input v-model="item.cprice" size="small" type="number"></el-input>
                    </td>
                    <td>
                        <el-input v-model="item.volume" size="small" type="number"></el-input>
                    </td>
                    <td>
                        <el-input v-model="item.stock" size="small" type="number"></el-input>
                    </td>
                    <td>
                        <el-input v-model="item.weight" size="small" type="number"></el-input>
                    </td>
                    <td>
                        <el-input v-model="item.code" size="small"></el-input>
                    </td> 
                </tr> 
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