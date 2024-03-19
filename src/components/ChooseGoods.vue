<template>
    <CommonDialog title="商品选择" width="80%" ref="commonDialogRef" top="6%" @submit="goodsSubmit">
        <template #content>
            <el-table :data="tableData" stripe style="width: 100%" v-loading="loading" :height="tableHeight" @selection-change="handleSelectionChange" ref="tableRef">
                <el-table-column type="selection" width="55" />
                <el-table-column label="商品">
                    <template #default="scope">
                    <div class="rose-f-row">
                        <div class="rose-f-c rose-mr-1">
                            <el-image :src="scope.row.cover" fit="cover" :lazy="true" class="smallImage"></el-image>
                        </div>
                        <div class="rose-f-1">
                            <p>{{ scope.row.title }}</p>
                            <div>
                                <span class="rose-font-red">￥{{ scope.row.min_price }}</span>
                                <el-divider direction="vertical"></el-divider>
                                <span class="rose-bg">￥{{ scope.row.min_oprice }}</span>
                            </div>
                            <p>分类：{{ scope.row.category ? scope.row.category.name : "未分类" }}</p>
                            <p>创建时间：{{ scope.row.create_time }}</p>
                        </div>
                    </div>
                    </template> 
                </el-table-column>
                <el-table-column label="总库存" prop="stock"></el-table-column>
                <el-table-column label="价格（元）">
                    <template #default="{ row }">
                        <span class="price">￥{{ row.min_price }}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span>￥{{ row.min_oprice }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="rose-f-row pagination">
                <el-pagination
                background
                layout="prev,pager,next"
                :total="total"
                :current-page="currentPage"
                :page-size="limit"
                @current-change="getData"
                />
            </div>
        </template>
    </CommonDialog>
</template>
<script setup>
import { ref,computed } from "vue";
import CommonDialog from './CommonDialog.vue';
import { getGoodsList } from '@/api/goods.js';
import { connectCategoryGoods } from '@/api/category.js'
import { useInitTable,useInitForm } from '@/composables/useCommon.js';
import { toast } from '@/composables/util.js';

const commonDialogRef = ref(null);

const { tableData,loading,currentPage,total,limit,getData,handleSelectionChange,tableRef,moreIds} = useInitTable({
  getList:getGoodsList,
  onGetListSuccess:(res)=>{
    tableData.value = res.list
    total.value = res.totalCount
  }
})

const tableHeight = computed(()=>{
    return (window.innerHeight - 380) + 'px';
  }
)

const goodsSubmit = ()=>{
    connectCategoryGoods({
        category_id:props.categoryId,
        goods_ids:moreIds.value
    }).then(res=>{
        props.getGoodsTable(props.categoryId)
        toast('关联成功！')
    }).finally(()=>{
        commonDialogRef.value.close()
    })
}

defineExpose({
    commonDialogRef
})

const props = defineProps({
    categoryId:Number,
    getGoodsTable:Function
})

</script>
<style lang="less" scoped>
.price{
    color: var(--rose-red);
}
.smallImage{
  width:50px;
  height:50px;
}

.pagination{
  justify-content: center;
  align-items: center;
  margin-top:20px;
}

</style>