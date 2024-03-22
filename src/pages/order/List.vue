<template>
    <div>
      <el-tabs v-model="searchForm.tab" @tab-change="getData" type="card">
          <el-tab-pane :label="item.name" :name="item.key" v-for="(item,index) in tabbars" :key="index"></el-tab-pane>
      </el-tabs> 
  
      <el-card shadow="always">
        <!-- 表单公共搜索区域 -->
        <Search @search="getData" @reset="reset" :model="searchForm">
            <SearchItem label="关键词">
              <el-input v-model="searchForm.title" placeholder="商品名称" clearable></el-input>
            </SearchItem>
            <!-- <template #show>
              <SearchItem label="商品分类">
                <el-select v-model="searchForm.category_id" placeholder="请选择商品分类" size="small" clearable>
                    <el-option v-for="item in category_list" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
              </SearchItem>
            </template> -->
        </Search>
  
        <ListHeader @create="handleCreate" @refresh="getData" layout="create,refresh">
          <el-button  size="small" @click="moreDelete" v-if="searchForm.tab !== 'delete'" type="danger">批量删除</el-button>
          <el-button  size="small" @click="moreRecover" v-else type="warning">恢复商品</el-button>
          <el-popconfirm title="是否要彻底删除改商品？" v-if="searchForm.tab == 'delete'" confirm-button-text="确认" cancel-button-text="取消" @confirm="cleanOut">
              <template #reference>
                <el-button size="small" type="danger">彻底删除</el-button>
              </template>
          </el-popconfirm>
          <el-button  size="small" @click="moreUnmount(1)" v-show="searchForm.tab == 'all' || searchForm.tab == 'off'">上架</el-button>
          <el-button  size="small" @click="moreUnmount(0)" v-show="searchForm.tab == 'all' || searchForm.tab == 'saling'">下架</el-button>
        </ListHeader>
  
        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading" :height="tableHeight" @selection-change="handleSelectionChange" ref="tableRef">
          <el-table-column type="selection" width="55" />
          <el-table-column label="商品" width="300">
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
          <el-table-column label="实际销量" width="80" prop="sale_count">
          </el-table-column>
          <el-table-column label="商品状态" width="100">
              <template #default="scope">
                <el-tag :type="scope.row.status ? 'success' : 'danger'" size="small">{{ scope.row.status ? '上架' : '仓库' }}</el-tag>
              </template>
          </el-table-column>
          <el-table-column label="审核状态" width="200" v-if="searchForm.tab !== 'delete'">
              <template #default="scope">
                <div class="rose-f-row" v-if="scope.row.ischeck == 0 ">
                  <el-button type="success" size="small" plain>审核通过</el-button>
                  <el-button type="danger" size="small" plain>审核拒绝</el-button>
                </div>
                <span v-else>{{ scope.row.ischeck == 1 ? '通过' : '拒绝' }}</span>
              </template>
          </el-table-column>
          <el-table-column label="总库存" width="80" prop="stock"></el-table-column>
          <el-table-column label="操作" with="350" align="center">
            <template #default="scope"> 
                <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
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
      </el-card>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { getOrderList, deleteOrder } from '@/api/order.js';
import {useInitTable} from '@/composables/useCommon.js';
import ListHeader from '@/components/ListHeader.vue';
import { getCategoryList } from '@/api/category.js';
import Search from '@/components/Search.vue';
import SearchItem from '@/components/SearchItem.vue';

const { searchForm,reset,tableData,loading,currentPage,total,limit,getData,handleDelete,handleSelectionChange,tableRef,
moreDelete,moreUnmount,moreRecover,cleanOut} = useInitTable({
getList:getOrderList,
delete:deleteOrder,
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

const tableHeight = computed(()=>{
    return (window.innerHeight - 380) + 'px';
}
)

const tabbars = [
    {key:'all',name:'全部'},
    {key:'checking',name:'审核中'},
    {key:'saling',name:'出售中'},
    {key:'off',name:'已下架'},
    {key:'min_stock',name:'库存预警'},
    {key:'delete',name:'回收站'}
]

// 商品分类
const category_list = ref([])

onMounted(() => {
getCategoryList().then(res=>{
    category_list.value = res
})
})

</script>
<style lang="less" scoped>
.pagination{
    justify-content: center;
    align-items: center;
    margin-top:20px;
}

.smallImage{
    width:50px;
    height:50px;
}

</style>
    
  