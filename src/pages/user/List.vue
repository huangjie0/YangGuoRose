<template>
    <el-card shadow="always">
      <!-- 表单公共搜索区域 -->
      <Search @search="getData" @reset="reset" :model="searchForm">
        <SearchItem label="关键词">
          <el-input v-model="searchForm.keyword" placeholder="手机号/邮箱/会员呢称" clearable></el-input>
        </SearchItem>
        <template #show> 
            <SearchItem label="会员等级">
                <el-select v-model="searchForm.user_level_id" placeholder="请输入会员等级" clearable> 
                    <el-option v-for="item in user_level" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </SearchItem>
        </template>
      </Search>

      <ListHeader @create="handleCreate" @refresh="getData"/>
      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading" :height="tableHeight">
        <el-table-column label="会员" width="200">
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
        <el-table-column label="会员等级" align="center">
            <template #default="scope">
                {{ scope.row.user_level ?.name || "-"}}
            </template>
        </el-table-column>
        <el-table-column label="登录注册" align="center">
            <template #default="scope">
                <p v-if="scope.row.last_login_time">
                    最后登录：{{ scope.row.last_login_time }}
                </p>
                <p>
                    注册时间：{{ scope.row.create_time }}
                </p>
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
              <el-popconfirm title="是否要删除改记录？" confirm-button-text="确认" cancel-button-text="取消" @confirm="handleDelete(scope.row.id)">
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
            <el-form-item label="昵称" prop="nickname"> 
              <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="avatar"> 
              <ChooseImage v-model="form.avatar"></ChooseImage>
            </el-form-item>
            <el-form-item label="会员等级" prop="user_level_id"> 
              <el-select v-model="form.user_level_id" placeholder="选择会员等级">
                <el-option
                  v-for="item in user_level"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="手机" prop="phone"> 
              <el-input v-model="form.phone" placeholder="请输入手机号码" type="number"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email"> 
              <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status"> 
              <el-switch  active-color="#a781ee" v-model="form.status" :active-value="1" :inactive-value="0"/>
            </el-form-item>
          </el-form>
      </FormDrawer>
    </el-card>
  </template>
  <script setup>
  import { ref, computed } from 'vue';
  import FormDrawer from '@/components/FormDrawer.vue';
  import ChooseImage from '@/components/ChooseImage.vue'
  import { getUserList,updateUserStatus,createUser,updateUser,deleteUser } from '@/api/user.js'
  import {useInitTable,useInitForm} from '@/composables/useCommon.js'
  import ListHeader from '@/components/ListHeader.vue'
  import Search from '@/components/Search.vue';
  import SearchItem from '@/components/SearchItem.vue'

  const user_level = ref([])

  const { searchForm,reset,tableData,loading,currentPage,total,limit,getData,handleDelete,handleChange } = useInitTable({
    getList:getUserList,
    delete:deleteUser,
    updateStatus:updateUserStatus,
    onGetListSuccess:(res)=>{
      tableData.value = res.list.map(o=>{
        o.statusLoading = false
        return o
      })
      total.value = res.totalCount
      user_level.value = res.user_level
    },
    searchForm:{
      keyword:'',
      user_level_id:null
    }
  })

const { formDrawerRef,formRef,form,rules,drawerTitle,handleSubmit,handleCreate,handleEdit } = useInitForm({
  getData,
  update:updateUser,
  create:createUser,
  form:{
    username: "",
    password: "",
    user_level_id: null,
    status: 1,
    avatar: "",
    nickname:"",
    phone:"",
    email:""
  }
})

const tableHeight = computed(()=>{
  return (window.innerHeight - 330) + 'px';
}
)
  
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
  
