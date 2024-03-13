<template>
    <el-form-item label="规格选项" v-loading="bodyLoading">
      <el-card class="specification-card" v-for="(item,index) in sku_card_list" :key="item.id" v-loading="item.loading">
        <template #header>
            <div class="rose-f-row specification-options">
                <el-input v-model="item.text" style="width: 200px" placeholder="规格名称" @change="handleUpdate(item)" size="small">
                    <template #append>
                        <el-icon class="rose-cursor" @click="handleChooseSku"><more/></el-icon>
                    </template>
                </el-input>
                <el-button size="small" class="rose-ml-a" @click="sortCard('up',index)" :disabled="index == 0">
                    <el-icon><Top /></el-icon>
                </el-button>
                <el-button size="small" @click="sortCard('down',index)" :disabled="index == sku_card_list.length-1">
                    <el-icon><Bottom /></el-icon>
                </el-button>
                <el-popconfirm title="是否要删除改规格选项？" confirm-button-text="确认" cancel-button-text="取消" @confirm="handleDelete(item)">
                    <template #reference>
                        <el-button size="small">
                            <el-icon><Delete /></el-icon>
                        </el-button>
                    </template>
                </el-popconfirm>
            </div>
        </template>
        <SkuCardItem :sku-card-id="item.id"></SkuCardItem>
      </el-card>
      <el-button type="success" size="small" :loading="btnLoading" @click="addSkuCardEvent">添加规格</el-button>
      <ChooseSku ref="chooseSkuRef" :first-active-id="firstActiveId" :get-data="getData" :limit="limit" :current-page="currentPage" :total="total" :loading="loading" :table-data="tableData"></ChooseSku>
    </el-form-item>
</template>
<script setup>
import { ref } from 'vue';
import SkuCardItem from './SkuCardItem.vue';
import ChooseSku from '@/components/ChooseSku.vue';
import { sku_card_list, addSkuCardEvent , btnLoading, handleUpdate , handleDelete , sortCard , bodyLoading } from '@/composables/useSku.js';
import { getSkusList } from '@/api/skus.js';
import { useInitTable } from '@/composables/useCommon.js';

const chooseSkuRef = ref(null);
const firstActiveId = ref(null);

const {  
    loading,
    currentPage,
    limit,
    total,
    tableData,
    getData
 } = useInitTable({
    getList:getSkusList,
    onGetListSuccess:(res)=>{
        total.value = res.totalCount;
        tableData.value = res.list;
        if(tableData.value.length > 0){
           firstActiveId.value =  tableData.value[0].id
        }
    }
 });

const handleChooseSku = ()=>{
    getData(1)
    chooseSkuRef.value.skuDialogRef.open()
}
</script>
<style lang="less">
.specification-card{
    width: 100%;
    &-options{
        align-items: center;
    }
}
.el-card__header{
    background-color: var(--rose-g3);
}
</style>