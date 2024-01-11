<template>
  <div>
    <el-tabs v-model="searchForm.tab" @tab-change="getData" type="card">
        <el-tab-pane :label="item.name" :name="item.key" v-for="(item,index) in tabbars" :key="index"></el-tab-pane>
    </el-tabs> 

    <el-card shadow="always">
      <!-- 表单公共搜索区域 -->
      <Search @search="getData" @reset="reset">
          <el-col :span="8" :offset="0">
            <el-form-item label="关键词">
              <el-input v-model="searchForm.title" placeholder="商品名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <template #show>
            <el-col :span="8" :offset="0">
              <el-form-item label="商品分类" prop="category_id">
                <el-select v-model="searchForm.category_id" placeholder="请选择商品分类" size="small" clearable>
                  <el-option v-for="item in category_list" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
          </template>
      </Search>
      
      <ListHeader @create="handleCreate" @refresh="getData"/>

      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading" :height="tableHeight">
        <el-table-column label="管理员" width="300">
            <template #default="scope">
              <div class="rose-f-row">
                <div class="rose-f-c rose-mr-1">
                  <el-image :src="scope.row.cover" fit="cover" :lazy="true" class="smallImage"></el-image>
                </div>
                <div class="rose-f-1">
                  <p>{{ scope.row.title }}</p>
                  <div>
                    <span class="rose-font-red">￥{{ scope.row.min_price }}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span class="rose-bg">￥{{ scope.row.min_oprice }}</span>
                  </div>
                  <p>分类：{{ scope.row.category ? scope.row.category.name : "未分类" }}</p>
                  <p>创建时间：{{ scope.row.create_time }}</p>
                </div>
              </div>
            </template> 
        </el-table-column>
        <el-table-column label="实际销量" width="80" prop="sale_count">
        </el-table-column>
        <el-table-column label="商品状态" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.status ? 'success' : 'danger'" size="small">{{ scope.row.status ? '上架' : '仓库' }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="审核状态" width="200" v-if="searchForm.tab !== 'delete'">
            <template #default="scope">
              <div class="rose-f-row" v-if="scope.row.ischeck == 0 ">
                <el-button type="success" size="small" plain>审核通过</el-button>
                <el-button type="danger" size="small" plain>审核拒绝</el-button>
              </div>
              <span v-else>{{ scope.row.ischeck == 1 ? '通过' : '拒绝' }}</span>
            </template>
        </el-table-column>
        <el-table-column label="总库存" width="80" prop="stock"></el-table-column>
        <el-table-column label="操作" with="350" align="center">
          <template #default="scope"> 
            <div v-if="searchForm.tab !== 'delete'">
              <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
              <el-button size="small">商品规格</el-button>
              <el-button size="small">设置轮播图</el-button>
              <el-button size="small">商品详情</el-button>
              <el-popconfirm title="是否要删除改商品？" confirm-button-text="确认" cancel-button-text="取消" @confirm="handleDelete(scope.row.id)">
                  <template #reference>
                      <el-button size="small" type="danger" >删除</el-button>
                  </template>
              </el-popconfirm>
            </div>  
            <span v-else>暂无操作</span>
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
  </div>
  </template>
  <script setup>
  import { ref, computed , onMounted } from 'vue';
  import FormDrawer from '@/components/FormDrawer.vue';
  import ChooseImage from '@/components/ChooseImage.vue';
  import { getGoodsList,updateGoodsStatus,createGoods,updateGoods,deleteGoods } from '@/api/goods.js';
  import {useInitTable,useInitForm} from '@/composables/useCommon.js';
  import ListHeader from '@/components/ListHeader.vue';
  import { getCategoryList } from '@/api/category.js';
  import Search from '@/components/Search.vue';
  
  const roles = ref([])
  const { searchForm,reset,tableData,loading,currentPage,total,limit,getData,handleDelete,handleChange } = useInitTable({
    getList:getGoodsList,
    delete:deleteGoods,
    updateStatus:updateGoodsStatus,
    onGetListSuccess:(res)=>{
      tableData.value = res.list.map(o=>{
        o.statusLoading = false
        return o
      })
      total.value = res.totalCount
      roles.value = res.roles
    },
    searchForm:{
      title:'',
      tab:'all',
      category_id:null
    }
  })

const { formDrawerRef,formRef,form,rules,drawerTitle,handleSubmit,handleCreate,handleEdit } = useInitForm({
  getData,
  update:updateGoods,
  create:createGoods,
  form:{
    username: "",
    password: "",
    role_id: null,
    status: 1,
    avatar: "",
  }
})

const tableHeight = computed(()=>{
    return (window.innerHeight - 380) + 'px';
  }
)

const tabbars = [
  {key:'all',name:'全部'},
  {key:'checking',name:'审核中'},
  {key:'saling',name:'出售中'},
  {key:'off',name:'已下架'},
  {key:'min_stock',name:'库存预警'},
  {key:'delete',name:'回收站'}
]

// 商品分类
const category_list = ref([])
const showSearch = ref(false)

onMounted(() => {
  getCategoryList().then(res=>{
    category_list.value = res
  })
})


  </script>
  <style lang="less" scoped>
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

  .smallImage{
    width:50px;
    height:50px;
  }

  </style>
  
