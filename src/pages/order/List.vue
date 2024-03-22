<template>
    <div>
      <el-tabs v-model="searchForm.tab" @tab-change="getData" type="card">
          <el-tab-pane :label="item.name" :name="item.key" v-for="(item,index) in tabbars" :key="index"></el-tab-pane>
      </el-tabs> 
  
      <el-card shadow="always">
        <!-- 表单公共搜索区域 -->
        <Search @search="getData" @reset="reset" :model="searchForm">
            <SearchItem label="订单编号">
              <el-input v-model="searchForm.no" placeholder="订单编号" clearable></el-input>
            </SearchItem>
            <!-- <template #show>
              <SearchItem label="商品分类">
                <el-select v-model="searchForm.category_id" placeholder="请选择商品分类" size="small" clearable>
                    <el-option v-for="item in category_list" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
              </SearchItem>
            </template> -->
        </Search>
  
        <ListHeader @create="handleCreate" @refresh="getData" layout="refresh">
          <el-button  size="small" @click="moreDelete" type="danger">批量删除</el-button>
        </ListHeader>
  
        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading" :height="tableHeight" @selection-change="handleSelectionChange" ref="tableRef">
          <el-table-column type="selection" width="55" />
          <el-table-column label="商品">
              <template #default="scope">
                <div class="rose-f-row">
                    <div class="rose-f-1">
                        <p>订单号：</p>
                        <small>{{ scope.row.no }}</small>
                    </div>
                    <div>
                        <p>下单时间：</p>
                        <small>{{ scope.row.create_time }}</small>
                    </div>
                </div>
                <div class="rose-f-row" v-for="(item,index) in scope.row.order_items" :key="index">
                    <el-image :src="item.goods_item ?.cover ?? ''" fit="fill" :lazy="true" class="smallImage"></el-image>
                    <p>{{ item.goods_item ?.title ?? '商品已经被删除' }}</p>
                </div>
              </template> 
          </el-table-column>
          <el-table-column label="实际付款" width="80" prop="total_price">
          </el-table-column>
          <el-table-column label="买家" align="center">
              <template #default="scope">
                <p>{{ scope.row.user.nickname || scope.row.user.username }}</p>
                <small>(用户ID： {{ scope.row.user.id }})</small>
              </template>
          </el-table-column>
          <el-table-column label="交易状态" align="center">
              <template #default="scope">
                <div>
                    付款状态：
                    <el-tag type="success" size="small" v-if="scope.row.payment_method == 'alipay'">微信支付</el-tag>
                    <el-tag type="primary" size="small" v-else-if="scope.row.payment_method == 'wechat'">支付宝支付</el-tag>
                    <el-tag type="info" size="small" v-else>未支付</el-tag>
                </div>
                <div>
                    发货状态：
                    <el-tag :type="scope.row.ship_data ? 'success' :'info' " size="small" >{{ scope.row.ship_data ? '已发货' : '未发货' }}</el-tag>
                </div>
                <div>
                    收货状态：
                    <el-tag :type="scope.row.ship_status == 'received' ? 'success' :'info' " 
                    size="small" >{{ scope.row.ship_status == 'received' ? '已收货' : '未收货' }}</el-tag>
                </div>
              </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="scope"> 
                <el-button size="small" @click="handleEdit(scope.row)">订单详情</el-button>
                <el-button size="small" v-show="searchForm.tab == 'noship'" @click="handleEdit(scope.row)">订单发货</el-button>
                <el-button size="small" v-show="searchForm.tab == 'refunding'" @click="handleEdit(scope.row)">同意退款</el-button>
                <el-button size="small" v-show="searchForm.tab == 'refunding'" @click="handleEdit(scope.row)">拒绝退款</el-button>
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
// import { getCategoryList } from '@/api/category.js';
import Search from '@/components/Search.vue';
import SearchItem from '@/components/SearchItem.vue';

const { searchForm,reset,tableData,loading,currentPage,total,limit,getData,handleSelectionChange,tableRef,
moreDelete} = useInitTable({
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
    no:'',
    tab:'all',
    starttime:'',
    endtime:'',
    name:'',
    phone:''
}
})

const tableHeight = computed(()=>{
    return (window.innerHeight - 380) + 'px';
}
)

const tabbars = [
    {key:'all',name:'全部'},
    {key:'nopay',name:'待支付'},
    {key:'noship',name:'待发货'},
    {key:'shiped',name:'待收货'},
    {key:'received',name:'已收货'},
    {key:'finish',name:'已完成'},
    {key:'closed',name:'已关闭'},
    {key:'refunding',name:'退款中'}
]

// 商品分类
// const category_list = ref([])

// onMounted(() => {
// getCategoryList().then(res=>{
//     category_list.value = res
// })
// })

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
    
  