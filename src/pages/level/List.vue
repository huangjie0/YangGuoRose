<template>
    <el-card shadow="always">
      <ListHeader @create="handleCreate" @refresh="getData"/>
      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading" :height="tableHeight">
        <el-table-column prop="name" label="会员等级"/>
        <el-table-column prop="discount" label="折扣率" align="center" />
        <el-table-column prop="level" label="等级序号" align="center" />
        <el-table-column label="状态" align="center">
            <template #default="scope">
              <el-switch :disabled = "scope.row.super == 1" :loading="scope.row.statusLoading" active-color="#a781ee" v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="handleChange($event,scope.row)"/>
            </template>
        </el-table-column>
        <el-table-column label="操作" with="380" align="center">
          <template #default="scope"> 
            <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
            <el-popconfirm title="是否要删除改记录？" confirm-button-text="确认" cancel-button-text="取消" @confirm="handleDelete(scope.row.id)">
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
      <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit"> 
          <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
            <el-form-item label="等级名称" prop="name"> 
                <el-input v-model="form.name" placeholder="请输入等级名称"></el-input>
            </el-form-item>
            <el-form-item label="等级权重" prop="level"> 
                <el-input v-model="form.level" placeholder="请输入等级权重" type="number"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" prop="status"> 
                <el-switch active-color="#a781ee" v-model="form.status" :active-value="1" :inactive-value="0"/>
            </el-form-item>
            <el-form-item label="升级条件"> 
                <div>
                    <small>累计消费满</small>
                    <el-input v-model="form.max_price" placeholder="请输入累计消费" type="number">
                        <template #append>元</template>
                    </el-input>
                    <small>
                        设置会员等级所需要的累计消费必须大于等级0，单位：元
                    </small>
                </div>
                <div>
                    <small>累计次数满</small>
                    <el-input v-model="form.max_times" placeholder="请输入累计次数" type="number">
                        <template #append>次</template>
                    </el-input>
                    <small>
                        设置会员的等级所需要的购买量必须大于等于0，单位：笔
                    </small>
                </div>
            </el-form-item>
            <el-form-item label="折扣率" prop="discount"> 
                <el-input v-model="form.discount" placeholder="请输入折扣率" type="number">
                    <template #append>%</template>
                </el-input>
                <small>
                    折扣率单位为百分比，如输入90，表示改会员等级的用户可以以商品原价的90%购买
                </small>
            </el-form-item>
          </el-form>
      </FormDrawer>
    </el-card>
  </template>
  <script setup>
  import { computed } from 'vue';
  import { getUserLevelList,createUserLevel,updateUserLevel,deleteUserLevel,updateUserLevelStatus } from '@/api/level.js';
  import FormDrawer from '@/components/FormDrawer.vue';
  import { useInitTable,useInitForm } from '@/composables/useCommon.js';
  import ListHeader from '@/components/ListHeader.vue';
  
  const { tableData,loading,currentPage,total,limit,getData,handleDelete,handleChange } = useInitTable({
    getList:getUserLevelList,
    delete:deleteUserLevel,
    updateStatus:updateUserLevelStatus
  })
  
  const { formDrawerRef,formRef,form,drawerTitle,rules,handleSubmit,handleCreate,handleEdit } = useInitForm({
    getData,
    update:updateUserLevel,
    create:createUserLevel,
    form:{
      name:'',
      level:100,
      status:1,
      discount:0,
      max_price:0,
      max_times:0
    },
    rules:{
      name:[{
          required: true,
          message: '会员等级不能为空！',
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
  </style>
  