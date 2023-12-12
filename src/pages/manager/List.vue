<template>
    <el-card shadow="always">
      <el-form :model="searchForm" label-width="80px" class="search-form" size="small">
        <el-row :gutter="20">
          <el-col :span="8" :offset="0">
            <el-form-item label="关键词">
              <el-input v-model="searchForm.keyword" placeholder="管理员名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="8">
              <div class="rose-f-row searchForm-flex">    
                <el-button type="primary" @click="getData">搜索</el-button>
                <el-button @click="reset">重置</el-button>
              </div>
          </el-col>
        </el-row>
      </el-form>
      <!-- 新增功能 -->
      <div class="rose-f-row rose-f1">
        <el-button type="primary" size="small" @click="handleCreate">新增</el-button>
        <el-tooltip content="刷新" placement="top">
          <el-button text @click="getData">
            <el-icon :size="20"><Refresh /></el-icon>
          </el-button>
        </el-tooltip>
      </div>
      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading" :height="tableHeight">
        <el-table-column label="管理员" width="200">
            <template #default="scope">
                <div class="manager rose-f-row"> 
                    <el-avatar :size="40" :src="scope.row.avatar">
                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                    </el-avatar>
                    <div class="manager-info">
                        <h6>{{ scope.row.username }}</h6>
                        <small>ID:{{ scope.row.id }}</small>
                    </div>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="所属角色" align="center">
            <template #default="scope">
                {{ scope.row.role ?.name || ""}}
            </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="120">
            <template #default="scope">
              <el-switch :disabled = "scope.row.super == 1" :loading="scope.row.statusLoading" active-color="#a781ee" v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="handleChange($event,scope.row)"/>
            </template>
        </el-table-column>
        <el-table-column label="操作" with="380" align="center">
          <template #default="scope"> 
            <small v-if="scope.row.super == 1">暂无操作</small>
            <div v-else>    
              <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
              <el-popconfirm title="是否要删除改管理员？" confirm-button-text="确认" cancel-button-text="取消" @confirm="handleDelete(scope.row.id)">
                  <template #reference>
                      <el-button size="small" type="danger" >删除</el-button>
                  </template>
              </el-popconfirm>
            </div>
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
            <el-form-item label="用户名" prop="usename"> 
              <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password"> 
              <el-input v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="avatar"> 
              <ChooseImage v-model="form.avatar"></ChooseImage>
            </el-form-item>
            <el-form-item label="所属角色" prop="role_id"> 
              <el-select v-model="form.role_id" placeholder="选择所属角色">
                <el-option
                  v-for="item in roles"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="status"> 
              <el-switch  active-color="#a781ee" v-model="form.status" :active-value="1" :inactive-value="0"/>
            </el-form-item>
          </el-form>
      </FormDrawer>
    </el-card>
  </template>
  <script setup>
  import { ref, onMounted, reactive, computed } from 'vue';
  import FormDrawer from '@/components/FormDrawer.vue';
  import ChooseImage from '@/components/ChooseImage.vue'
  import { toast } from '@/composables/util.js';
  import { getManagerList,updateManagerStatus,createManager,updateManager,deleteManager } from '@/api/manager.js'
  
  const loading = ref(false);
  //分页
  const currentPage = ref(1);
  const total = ref(0);
  const limit = ref(10);
  const tableData = ref([]);
  const formDrawerRef = ref()
  const formRef = ref()
  const editId = ref(0)
  const drawerTitle = computed(()=>
    editId.value ? '修改' : '新增'
  )

const tableHeight = computed(()=>{
  return (window.innerHeight - 330) + 'px';
}
)
  
  const form = reactive({
    username:'',
    password:'',
    role_id:null,
    status:1,
    avatar:''
  })
  
  const searchForm = reactive({
    keyword:''
  })

  const rules = {}

  const roles = ref([])
  
  const getData = (page = null) => {
    if (typeof page == "number") {
      currentPage.value = page;
    }
  
    loading.value = true;
    getManagerList(currentPage.value,searchForm)
      .then((res) => {
        tableData.value = res.list.map(o=>{
          o.statusLoading = false
          return o
        })
        total.value = res.totalCount
        roles.value = res.roles
      })
      .finally(() => {
        loading.value = false;
      });
  };
  
  onMounted(()=>{
    getData()
  })
  
  const handleDelete = (id)=>{
    loading.value = true
    deleteManager(id).then((res)=>{
      toast('删除成功！')
      getData()
    }).finally(()=>{
      loading.value = false
    })
  } 
  
  const handleSubmit = ()=>{
    formRef.value.validate((valid)=>{
      if(!valid) return
        formDrawerRef.value.showLoading()
        const fun = editId.value ? updateManager(editId.value,form) : createManager(form)
        fun.then((res)=>{
          toast(drawerTitle.value + '成功！')
          getData(editId.vlaue ? false : 1)
          formDrawerRef.value.close()
        }).finally(()=>{
          formDrawerRef.value.hideLoading()
        })
    })
  }
  //重置表单
  const resetForm = ()=>{
    if(formRef.value){
      formRef.value.clearValidate()
    }
  }
//重置功能
  const reset = ()=>{
    searchForm.keyword = ''
    getData()
  }

  const handleChange = (value,row)=>{
    row.statusLoading = true
    updateManagerStatus(row.id,value).then((res)=>{
      toast('修改状态成功')
      row.status = value
    }).finally(()=>{
      row.statusLoading = false
    })
  }
  
  //新增
  const handleCreate = ()=>{
    editId.value = 0
    resetForm()
    form.username = ''
    form.password = ''
    form.role_id = null
    form.status = 1
    form.avatar = ''
    formDrawerRef.value.open()
  }
  
  //修改
  const handleEdit = (row)=>{
    resetForm()
    for (const key in form) {
        form[key] = row[key]
    }
  
    editId.value = row.id
    formDrawerRef.value.open()
  }
  
  </script>
  <style lang="less">
  .search-form{
    margin-bottom:10px;
    &-flex{
      align-items: center;
      justify-content: end;
    }
  }
  .pagination{
    justify-content: center;
    align-items: center;
    margin-top:20px;
  }
  .manager{
    align-items: center;
    &-info{
        margin-left:10px;
    }
  }
  </style>
  
