<template>
    <el-card shadow="always">
      <ListHeader @create="handleCreate" @refresh="getData" layout="create,delete,refresh"/>
      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading" :height="tableHeight">
        <el-table-column prop="name" label="规格名称" width="380" />
        <el-table-column prop="default" label="规格值" width="380" />
        <el-table-column prop="order" label="排序" />
        <el-table-column label="状态" align="center" width="120">
            <template #default="scope">
              <el-switch :disabled = "scope.row.super == 1" :loading="scope.row.statusLoading" active-color="#a781ee" v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="handleChange($event,scope.row)"/>
            </template>
        </el-table-column>
        <el-table-column label="操作" with="380" align="center">
          <template #default="scope"> 
            <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
            <el-popconfirm title="是否要删除改数据？" confirm-button-text="确认" cancel-button-text="取消" @confirm="handleDelete(scope.row.id)">
                <template #reference>
                    <el-button size="small" type="danger" >删除</el-button>
                </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
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
      <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit" destroyOnClose> 
          <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
            <el-form-item label="规格名称" prop="name"> 
              <el-input v-model="form.name" placeholder="请输入规格名称"></el-input>
            </el-form-item>
            <el-form-item label="规格值" prop="default"> 
              <TagInput v-model="form.default"></TagInput>
            </el-form-item>
            <el-form-item label="状态" prop="status"> 
                <el-switch active-color="#a781ee" v-model="form.status" :active-value="1" :inactive-value="0"/>
            </el-form-item>
            <el-form-item label="排序" prop="order"> 
                <el-input-number v-model="form.order" placeholder="请输入排序" :min="0" :max="1000"></el-input-number>
            </el-form-item>
          </el-form>
      </FormDrawer>
    </el-card>
  </template>
  <script setup>
  import { computed,ref } from 'vue';
  import { getSkusList,createSkus,updateSkus,deleteSkus,updateSkusStatus } from '@/api/skus.js';
  import FormDrawer from '@/components/FormDrawer.vue';
  import { useInitTable,useInitForm } from '@/composables/useCommon.js';
  import ListHeader from '@/components/ListHeader.vue';
  import TagInput from '@/components/TagInput.vue';
  import { getRuleList } from '@/api/rules.js';
  import { toast } from "@/composables/util.js";
  
  const { tableData,loading,currentPage,total,limit,getData,handleDelete,handleChange } = useInitTable({
    getList:getSkusList,
    delete:deleteSkus,
    updateStatus:updateSkusStatus
  })
  
  const { formDrawerRef,formRef,form,drawerTitle,rules,handleSubmit,handleCreate,handleEdit } = useInitForm({
    getData,
    update:updateSkus,
    create:createSkus,
    form:{
      name:'',
      default:'',
      status:1,
      order:50
    },
    rules:{
      name:[{
          required: true,
          message: '规格名称不能为空！',
          trigger: 'blur'
      }],
      default:[{
          required: true,
          message: '规格值不能为空！',
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
    margin-top:20px;
  }

  .roleTag{
    align-items: center;
  }
  </style>
  