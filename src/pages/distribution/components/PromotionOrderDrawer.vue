<template>
    <FormDrawer title="推广订单" ref="formDrawer" confirmText="确定" @submit="submit">
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
             <el-table-column label="订单号" align="center">
                <template #default="scope">
                    {{ scope.row.order.no }}
                 </template>
             </el-table-column>
             <el-table-column label="用户名|昵称|手机" align="center">
                <template #default="scope">
                    <div v-if="!scope.row.order.user">
                        改用户已被删除
                    </div>
                    <div v-else>
                        {{ scope.row.order.user.username}} | {{  scope.row.order.user.nickname }} | {{ scope.row.order.user.phone }}
                    </div>
                 </template>
             </el-table-column>
             <el-table-column label="时间" align="center" prop="create_time"/>
             <el-table-column label="返佣金额" align="center" prop="commission"/>
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
 import { getAgentOrderList } from '@/api/distribution.js';
 import {useInitTable} from '@/composables/useCommon.js';
 
 const { searchForm,reset,tableData,loading,currentPage,total,limit,getData } = useInitTable({
   getList:getAgentOrderList,
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
 
 watch(()=>props.promotionOrderId,()=>{
     searchForm.user_id = props.promotionOrderId
     getData()
 })
 
 const formDrawer = ref(null);
 
 const props = defineProps({
    promotionOrderId:[String,Number]
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