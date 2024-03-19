<template>
    <CommonDialog title="商品选择" width="80%" ref="commonDialogRef" top="6%">
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
        </template>
    </CommonDialog>
</template>
<script setup>
import { ref,computed } from "vue";
import CommonDialog from './CommonDialog.vue';
import { getGoodsList } from '@/api/goods.js';
import { useInitTable,useInitForm } from '@/composables/useCommon.js';

const commonDialogRef = ref(null);

const { searchForm,reset,tableData,loading,currentPage,total,limit,getData,handleSelectionChange,tableRef} = useInitTable({
  getList:getGoodsList,
  onGetListSuccess:(res)=>{
    tableData.value = res.list
    total.value = res.totalCount
  },
  searchForm:{
    title:'',
    tab:'all',
    category_id:null
  }
})

const tableHeight = computed(()=>{
    return (window.innerHeight - 380) + 'px';
  }
)

// const { formDrawerRef,formRef,form,rules,drawerTitle,handleSubmit,handleCreate,handleEdit } = useInitForm({
//   getData,
//   update:updateGoods,
//   create:createGoods,
//   form:{
//     title:"",	 		
//     category_id:null,
//     cover:"",
//     desc:"", 
//     unit:"件",
//     stock:100,
//     min_stock:0,
//     status:1,
//     stock_display:1,
//     min_price:0,
//     min_oprice:0,
//   }
// })


defineExpose({
    commonDialogRef
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
</style>