<template>
    <div>
        <Panel></Panel>
        <el-card shadow="always" class="rose-mt-1">
            <!-- 表单公共搜索区域 -->
            <Search @search="getData" @reset="reset" :model="searchForm">
                <SearchItem label="关键词">
                <el-input v-model="searchForm.keyword" placeholder="手机号/邮箱/会员呢称" clearable></el-input>
                </SearchItem>
                <template #show> 
                    <!-- <SearchItem label="会员等级">
                        <el-select v-model="searchForm.user_level_id" placeholder="请输入会员等级" clearable> 
                            <el-option v-for="item in user_level" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </SearchItem> -->
                </template>
            </Search>

            <el-table :data="tableData" stripe style="width: 100%" v-loading="loading" :height="tableHeight">
                <el-table-column label="ID" prop="id" align="center"></el-table-column>
                <el-table-column label="头像" width="65">
                    <template #default="scope">
                        <el-avatar :size="40" :src="scope.row.avatar">
                            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                        </el-avatar>
                    </template>
                </el-table-column>
                <el-table-column label="用户信息">
                    <template #default="{ row }">
                        <div>
                            <p>用户：{{ row.username }}</p>
                            <p>昵称：{{ row. nickname}}</p>
                            <p>姓名：{{ row.user_info.name }}</p>
                            <p>电话：{{ row.phone }}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="推广用户数量" align="center" prop="share_num"></el-table-column>
                <el-table-column label="订单数量" align="center" prop="share_order_num"></el-table-column>
                <el-table-column label="订单金额" align="center" prop="order_price"></el-table-column>
                <el-table-column label="账户佣金" align="center" prop="commission"></el-table-column>
                <el-table-column label="已提现金额" align="center" prop="cash_out_price"></el-table-column>
                <el-table-column label="提现次数" align="center" prop="cash_out_time"></el-table-column>
                <el-table-column label="未提现金额" align="center" prop="no_cash_out_price"></el-table-column>
                <el-table-column label="操作" align="center" width="200">
                    <template #default="{row}"> 
                        <el-button type="primary" size="small">推广人</el-button>
                        <el-button type="primary" size="small">推广订单</el-button>
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
import { computed } from 'vue';
import { getAgentList } from '@/api/distribution.js';
import {useInitTable} from '@/composables/useCommon.js';
import Search from '@/components/Search.vue';
import SearchItem from '@/components/SearchItem.vue';
import Panel from './components/Panel.vue';

const { searchForm,reset,tableData,loading,currentPage,total,limit,getData } = useInitTable({
  getList:getAgentList,
  onGetListSuccess:(res)=>{
    tableData.value = res.list
    total.value = res.totalCount
  },
  searchForm:{
    keyword:'',
    type:"all",
    starttime:null,
    endtime:null
}
})

const tableHeight = computed(()=>{
    return (window.innerHeight - 400) + 'px';
}
)
</script>
<style lang="less" scoped>
</style>