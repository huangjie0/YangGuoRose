<template>
    <CommonDialog title="商品选择" width="80%" ref="commonDialogRef">
        <template #content>
            111
        </template>
    </CommonDialog>
</template>
<script setup>
import { ref } from "vue";
import CommonDialog from './CommonDialog.vue';
import { getGoodsList } from '@/api/goods.js';
import { useInitTable,useInitForm } from '@/composables/useCommon.js';

const commonDialogRef = ref(null);

const { searchForm,reset,tableData,loading,currentPage,total,limit,getData,handleDelete,handleSelectionChange,tableRef,
  moreDelete,moreUnmount,moreRecover,cleanOut} = useInitTable({
  getList:getGoodsList,
  delete:deleteGoods,
  recover:restoreGoods,
  updateStatus:updateGoodsStatus,
  thoroughlyDelete:destroyGoods,
  onGetListSuccess:(res)=>{
    tableData.value = res.list.map(o=>{
      o.bannersLoading = false
      o.contentLoading = false
      o.goodsSkusLoading = false
      return o
    })
    total.value = res.totalCount
  },
  searchForm:{
    title:'',
    tab:'all',
    category_id:null
  }
})

const { formDrawerRef,formRef,form,rules,drawerTitle,handleSubmit,handleCreate,handleEdit } = useInitForm({
  getData,
  update:updateGoods,
  create:createGoods,
  form:{
    title:"",	 		
    category_id:null,
    cover:"",
    desc:"", 
    unit:"件",
    stock:100,
    min_stock:0,
    status:1,
    stock_display:1,
    min_price:0,
    min_oprice:0,
  }
})


defineExpose({
    commonDialogRef
})

</script>
<style lang="less" scoped>

</style>