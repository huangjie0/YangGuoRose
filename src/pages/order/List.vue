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
            <template #show>
              <SearchItem label="收货人">
                <el-input v-model="searchForm.name" placeholder="收货人" clearable></el-input>
              </SearchItem>
              <SearchItem label="手机号">
                <el-input v-model="searchForm.phone" type="number" placeholder="手机号" clearable></el-input>
              </SearchItem>
              <SearchItem label="开始时间">
                <el-date-picker v-model="searchForm.starttime" type="date" placeholder="开始时间" value-format="YYYY-MM-DD"></el-date-picker>
              </SearchItem>
              <SearchItem label="结束时间">
                <el-date-picker v-model="searchForm.endtime" type="date" placeholder="结束时间" value-format="YYYY-MM-DD"></el-date-picker>
              </SearchItem>
            </template>
        </Search>
  
        <ListHeader @refresh="getData" @derive="derive" layout="refresh,derive">
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
                <el-button size="small" @click="handleOrderDetails(scope.row)">订单详情</el-button>
                <el-button size="small" v-show="searchForm.tab == 'noship'" @click="handleEdit(scope.row)">订单发货</el-button>
                <el-button size="small" v-show="searchForm.tab == 'refunding'" @click="handleEdit(scope.row)">同意退款</el-button>
                <el-button size="small" v-show="searchForm.tab == 'refunding'" @click="handleEdit(scope.row)">拒绝退款</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 导出 -->
        <ExportExcel ref="exportExcelRef" :tabs="tabbars"></ExportExcel>
        <!-- 订单详情 -->
        <OrderDetails ref="orderDetailsRef" :info="info"></OrderDetails>

        <div class="rose-f-c pagination">
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
import { computed,ref } from 'vue';
import { getOrderList, deleteOrder } from '@/api/order.js';
import {useInitTable} from '@/composables/useCommon.js';
import ListHeader from '@/components/ListHeader.vue';
import Search from '@/components/Search.vue';
import SearchItem from '@/components/SearchItem.vue';
import ExportExcel from './components/ExportExcel.vue';
import OrderDetails from './components/OrderDetails.vue';

const { searchForm,reset,tableData,loading,currentPage,total,limit,getData,handleSelectionChange,tableRef,
moreDelete} = useInitTable({
    getList:getOrderList,
    delete:deleteOrder,
    onGetListSuccess:(res)=>{
        tableData.value = res.list
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

const exportExcelRef = ref(null)
const orderDetailsRef = ref(null)
const info = ref(null); 

const handleOrderDetails = (row)=>{
  info.value = row;
  console.log(row.order_items);
  row.order_items = row.order_items.map(o=>{
    if(o.skus_type == 1 && o.goods_skus){
      let s = []
      for (const k in o.goods_skus.skus) {
          s.push( o.goods_skus.skus[k].value)
      }
      o.sku =  s.join(',')
    }
    return o
  })
  
  orderDetailsRef.value.formDrawerRef.open()
}

const tableHeight = computed(()=>{
        return (window.innerHeight - 420) + 'px';
  }
)

//导出
const derive = ()=>{
    exportExcelRef.value.formDrawerRef.open()
}

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

</script>
<style lang="less" scoped>
.pagination{
    margin-top:20px;
}

.smallImage{
    width:50px;
    height:50px;
}

</style>
    
  