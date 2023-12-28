<template>
    <el-card shadow="always">
      <ListHeader @create="handleCreate" @refresh="getData"/>
      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading" :height="tableHeight">
        <el-table-column prop="name" label="角色名称" width="380" />
        <el-table-column prop="desc" label="角色描述" width="380" />
        <el-table-column label="状态" align="center" width="120">
            <template #default="scope">
              <el-switch :disabled = "scope.row.super == 1" :loading="scope.row.statusLoading" active-color="#a781ee" v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="handleChange($event,scope.row)"/>
            </template>
        </el-table-column>
        <el-table-column label="操作" with="380" align="center">
          <template #default="scope"> 
            <el-button size="small" @click="openStatus(scope.row)">配置权限</el-button>
            <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
            <el-popconfirm title="是否要删除改公告？" confirm-button-text="确认" cancel-button-text="取消" @confirm="handleDelete(scope.row.id)">
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
            <el-form-item label="角色名称" prop="name"> 
              <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="desc"> 
              <el-input v-model="form.desc" placeholder="请输入角色描述" type="textarea" :rows="5"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status"> 
                <el-switch active-color="#a781ee" v-model="form.status" :active-value="1" :inactive-value="0"/>
            </el-form-item>
          </el-form>
      </FormDrawer>
      <!-- 权限配置 -->
      <FormDrawer ref="setRoleFormDrawerRef" title="权限配置" @submit="handleSetRoleSubmit"> 
        <el-tree node-key="id" :default-expanded-keys="defaultExpandedKeys" :data="ruleList" :props="{ label:'name',children:'child' }" show-checkbox>
          <template #default="{ node, data }">
            <div class="rose-f-row roleTag">
                <el-tag :type="data.menu ? '' : 'info'" size="small">
                  {{ data.menu ? '菜单' : '权限' }}
                </el-tag>
                <span class="rose-ml-1 rose-font-s3">{{ data.name }}</span>
            </div>
          </template>
        </el-tree>
      </FormDrawer>
    </el-card>
  </template>
  <script setup>
  import { computed,ref } from 'vue';
  import { getRoleList,createRole,updateRole,deleteRole,updateRoleStatus } from '@/api/role.js';
  import FormDrawer from '@/components/FormDrawer.vue';
  import { useInitTable,useInitForm } from '@/composables/useCommon.js';
  import ListHeader from '@/components/ListHeader.vue';
  import { getRuleList } from '@/api/rules.js';
  
  const { tableData,loading,currentPage,total,limit,getData,handleDelete,handleChange } = useInitTable({
    getList:getRoleList,
    delete:deleteRole,
    updateStatus:updateRoleStatus
  })
  
  const { formDrawerRef,formRef,form,drawerTitle,rules,handleSubmit,handleCreate,handleEdit } = useInitForm({
    getData,
    update:updateRole,
    create:createRole,
    form:{
      name:'',
      desc:'',
      status:1,
    },
    rules:{
      name:[{
          required: true,
          message: '角色名称不能为空！',
          trigger: 'blur'
      }]
    }
  })

  const setRoleFormDrawerRef = ref(null)
  const ruleList = ref([])
  const ruleId = ref(0)
  const defaultExpandedKeys = ref([])
   
  const tableHeight = computed(()=>{
    return (window.innerHeight - 270) + 'px';
  }
  )
  
  const handleSetRoleSubmit = ()=>{
    
  }

  const openStatus = (row) => {
    ruleId.value = row.id
    getRuleList(1).then(res => {
        ruleList.value = res.list
        setRoleFormDrawerRef.value.open()
    })
  }
  
  </script>
  <style lang="less">
  .pagination{
    margin-top:20px;
  }

  .roleTag{
    align-items: center;
  }
  </style>
  