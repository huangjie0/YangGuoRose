<template>
    <el-card shadow="never">
        <ListHeader @refresh="getData" @create="handleCreate"/>
        <el-tree :data="tableData" :props="{ label:'name',children:'child' }" v-loading="loading" node-key="id">
            <template #default="{ data }">
                <div class="rose-f-row custom-tree-node rose-f-1 rose-font-s3">
                    <el-icon v-if="data.icon" :size="16" class="icon-ml">
                        <component :is="data.icon"></component>
                    </el-icon>
                    <span> {{ data.name }}</span>
                    <div class="rose-ml-a">
                        <el-button type="primary" :loading="data.goodsCategoryLoading" size="small" @click="recommendedGoods(goodsDrawerRef,goodsCallBack(data,data.id),data)">推荐商品</el-button>

                        <span @click.stop="()=>{}">
                            <el-switch v-model="data.status" :active-value="1" :inactive-value="0" class="switch-mr" @change="handleChange($event,data)"></el-switch>
                        </span>
                        <el-button size="small" @click.stop="handleEdit(data)">修改</el-button>
                     
                        <span @click.stop="()=>{}" class="rose-ml-1">
                            <el-popconfirm title="是否删除改条数据?" @confirm="handleDelete(data.id)" >
                                <template #reference>
                                    <el-button type="danger" size="small">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </span>
                    </div> 
                </div>
            </template>
        </el-tree>
        <FormDrawer ref="formDrawerRef" @submit="handleSubmit" :title="drawerTitle">
            <el-form :model="form" label-width="100px" ref="formRef" :rules="rules" :inline="false">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="form.name" clearable class="nameInput"></el-input>
                </el-form-item>
            </el-form>
        </FormDrawer>
        <!-- 推荐商品弹框 -->
        <GoodsDrawer ref="goodsDrawerRef" :goods-table-data="goodsTableData" @get-data="getGoodsData"></GoodsDrawer>
    </el-card>
</template>
<script setup>
import { ref } from 'vue';
import ListHeader from '@/components/ListHeader.vue'
import { getCategoryList,createCategory,updateCategory,updateCategoryStatus,deleteCategory,getCategoryGoods} from '@/api/category.js'
import { useInitTable,useInitForm } from '@/composables/useCommon.js'
import FormDrawer from '@/components/FormDrawer.vue';
import GoodsDrawer from './components/GoodsDrawer.vue';

let { 
    loading,
    tableData,
    getData,
    handleDelete,
    handleChange
 } = useInitTable({
    getList:getCategoryList,
    onGetListSuccess:(res)=>{
        tableData = res.map(o=>{
            o.goodsCategoryLoading = false
            return o
        })
    },
    delete:deleteCategory,
    updateStatus:updateCategoryStatus
})

const goodsDrawerRef = ref(null)

const { formDrawerRef,formRef,form,drawerTitle,rules,handleSubmit,handleCreate,handleEdit,recommendedGoods } = useInitForm({
  getData,
  update:updateCategory,
  create:createCategory,
  form:{
    name:''
  },
  rules:{}
})

const goodsTableData = ref([])

function goodsCallBack(data,id){
    getCategoryGoods(id).then(res=>{
        goodsTableData.value = res
    }).finally(()=>{
        data.goodsCategoryLoading = false
    })
}

const getGoodsData = (id)=>{
    goodsCallBack({},id)
}   

</script>
<style lang="less">

.nameInput{ 
    width:30%;
}

.custom-tree-node{
    align-items: center;
    padding-right: 8px;
    .icon-ml{
        margin-left:var(--common-split5);
    }
    .switch-mr{
        margin-right:var(--common-split5);
        margin-left: var(--common-split5);
    }
}

.el-tree-node__content{
    padding:var(--common-split) 0;
}

</style>