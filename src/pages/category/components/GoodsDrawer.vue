<template>
    <FormDrawer ref="formDrawer" title="推荐商品" @submit="submit" confirmText="关联">
        <el-table :data="goodsTableData" style="width: 100%" border>
            <el-table-column prop="goods_id" label="ID" width="180"> </el-table-column>
            <el-table-column prop="name" label="商品名称" width="180"> </el-table-column>
            <el-table-column label="商品封面">
                <template #default="{ row }">
                    <el-image :src="row.cover" fit="fill" :lazy="true" style="width: 64px; height: 64px;"></el-image>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template #default="{ row }">
                    <el-popconfirm title="是否删除改条数据?" @confirm="deleteGoods(row.id,row.category_id)" >
                        <template #reference>
                            <el-button type="danger" size="small">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <ChooseGoods ref="chooseGoodsRef" :categoryId="categoryId" :get-goods-table="getGoodsTable"></ChooseGoods>
    </FormDrawer>
</template>
<script setup>
import { ref } from 'vue';
import FormDrawer from '@/components/FormDrawer.vue';
import { deleteCategoryGoods } from '@/api/category.js';
import { toast } from '@/composables/util.js';
import ChooseGoods from '@/components/ChooseGoods.vue';

const formDrawer = ref(null);
const chooseGoodsRef = ref(null);

const deleteGoods = (id,goodId)=>{
    deleteCategoryGoods(id).then((res)=>{
        toast('删除成功！')
        emits('getData',goodId)
    })
}

defineExpose({
    formDrawer
})

const emits = defineEmits(['getData'])

const submit = ()=>{
    chooseGoodsRef.value.commonDialogRef.open()
}

defineProps({
    goodsTableData:Array,
    categoryId:Number,
    getGoodsTable:Function
})
</script>
<style lang="less">


</style>