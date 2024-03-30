<template>
   <FormDrawer title="推广人" ref="formDrawer" confirmText="确定" @submit="submit">
        <el-form :model="searchForm" size="small">
            <el-form-item label="时间选择">
                <el-radio-group v-model="searchForm.type">
                    <el-radio label="all" border>全部</el-radio>
                    <el-radio label="toady" border>今天</el-radio>
                    <el-radio label="yesterday" border>昨天</el-radio>
                    <el-radio label="last7days" border>最近7天</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="开始时间">
                <el-date-picker v-model="searchForm.starttime" type="date" placeholder="开始时间" value-format="YYYY-MM-DD"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
                <el-date-picker v-model="searchForm.endtime" type="date" placeholder="结束时间" value-format="YYYY-MM-DD"></el-date-picker>
            </el-form-item>
            <el-form-item label="用户类型">
                <el-radio-group v-model="searchForm.level">
                    <el-radio :label="0" border>全部</el-radio>
                    <el-radio :label="1" border>一级推广</el-radio>
                    <el-radio :label="2" border>二级推广</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getData">搜索</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading" :height="tableHeight">
            <el-table-column label="ID" prop="id" align="center"></el-table-column>
            <el-table-column label="头像" width="65">
                <template #default="scope">
                    <el-avatar :size="40" :src="scope.row.avatar">
                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                    </el-avatar>
                </template>
            </el-table-column>
            <el-table-column label="用户信息" prop="username"></el-table-column>
            <el-table-column label="推广数" align="center" prop="share_num"></el-table-column>
            <el-table-column label="推广订单数量" align="center" prop="share_order_num"></el-table-column>
            <el-table-column label="绑定时间" align="center" prop="create_time"></el-table-column>
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
   </FormDrawer>
</template>
<script setup>
import { ref,watch } from 'vue';
import FormDrawer from '@/components/FormDrawer.vue';
import { getAgentList } from '@/api/distribution.js';
import {useInitTable} from '@/composables/useCommon.js';

const { searchForm,reset,tableData,loading,currentPage,total,limit,getData } = useInitTable({
  getList:getAgentList,
  onGetListSuccess:(res)=>{
    tableData.value = res.list
    total.value = res.totalCount
  },
  searchForm:{
    type:"all",
    starttime:null,
    endtime:null,
    level:0,
    user_id:null
}
})

watch(()=>props.promoterId,()=>{
    searchForm.user_id = props.promoterId
    getData()
})

const formDrawer = ref(null);

const props = defineProps({
    promoterId:[String,Number]
})

const submit = ()=>{
    formDrawer.value.close()
}

defineExpose({
    formDrawer
})

</script>
<style lang="less" scoped>

</style>