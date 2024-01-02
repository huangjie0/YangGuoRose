<template>
    <el-card shadow="always">
      <ListHeader @create="handleCreate" @refresh="getData"/>
      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading" :height="tableHeight">
        <el-table-column label="优惠券名称" width="380">
            <template #default="{ row }">
                <div class="couponBorder">
                    <h5 class="rose-font-w2 rose-font-s3">{{ row.name }}</h5>
                    <small>{{ row.start_time }} ~ {{ row.end_time }}</small>
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="statusText" label="状态" />
        <el-table-column label="优惠" width="380">
            <template #default="{ row }">
                {{row.type ? "满减" : "折扣"}} {{ row.type ? ("￥" + row.value ) : (row.value + "折") }}
            </template>
        </el-table-column>
        <el-table-column prop="total" label="发放数量"/>
        <el-table-column prop="used" label="已使用" />
        <el-table-column label="操作" with="380" align="center">
          <template #default="scope"> 
            <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
            <el-popconfirm title="是否要删除改公告？" confirm-button-text="确认" cancel-button-text="取消" @confirm="handleDelete(scope.row.id)">
                <template #reference>
                    <el-button size="small" type="danger" >删除</el-button>
                </template>
            </el-popconfirm>
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
      <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit"> 
          <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
            <el-form-item label="公告标题" prop="title"> 
              <el-input v-model="form.title" placeholder="公告标题"></el-input>
            </el-form-item>
            <el-form-item label="公告内容" prop="content"> 
              <el-input v-model="form.content" placeholder="公告内容" type="textarea" :rows="5"></el-input>
            </el-form-item>
          </el-form>
      </FormDrawer>
    </el-card>
  </template>
  <script setup>
  import { computed } from 'vue';
  import { getCouponList,createCoupon,updateCoupon,deleteCoupon,updateCouponStatus } from '@/api/coupon.js'
  import FormDrawer from '@/components/FormDrawer.vue';
  import { useInitTable,useInitForm } from '@/composables/useCommon.js'
  import ListHeader from '@/components/ListHeader.vue'
  
  const { tableData,loading,currentPage,total,limit,getData,handleDelete} = useInitTable({
    getList:getCouponList,
    delete:deleteCoupon,
  })
  
  const { formDrawerRef,formRef,form,drawerTitle,rules,handleSubmit,handleCreate,handleEdit } = useInitForm({
    getData,
    update:updateCoupon,
    create:createCoupon,
    form:{
      title:'',
      content:''
    },
    rules:{
      title:[{
          required: true,
          message: '公告标题不能为空！',
          trigger: 'blur'
      }],
    content:[{
          required: true,
          message: '公告内容不能为空！',
          trigger: 'blur'
      }]
    }
  })
  
  const tableHeight = computed(()=>{
    return (window.innerHeight - 270) + 'px';
  }
  )
  
  </script>
  <style lang="less">
  .pagination{
    justify-content: center;
    align-items: center;
    margin-top:20px;
  }

  .couponBorder{

  }
  </style>
  