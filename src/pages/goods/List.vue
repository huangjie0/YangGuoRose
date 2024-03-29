<template>
  <div>
    <el-tabs v-model="searchForm.tab" @tab-change="getData" type="card">
        <el-tab-pane :label="item.name" :name="item.key" v-for="(item,index) in tabbars" :key="index"></el-tab-pane>
    </el-tabs> 

    <el-card shadow="always">
      <!-- 表单公共搜索区域 -->
      <Search @search="getData" @reset="reset" :model="searchForm">
          <SearchItem label="关键词">
            <el-input v-model="searchForm.title" placeholder="商品名称" clearable></el-input>
          </SearchItem>
          <template #show>
            <SearchItem label="商品分类">
              <el-select v-model="searchForm.category_id" placeholder="请选择商品分类" size="small" clearable>
                  <el-option v-for="item in category_list" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
            </SearchItem>
          </template>
      </Search>

      <ListHeader @create="handleCreate" @refresh="getData" layout="create,refresh">
        <el-button  size="small" @click="moreDelete" v-if="searchForm.tab !== 'delete'" type="danger">批量删除</el-button>
        <el-button  size="small" @click="moreRecover" v-else type="warning">恢复商品</el-button>
        <el-popconfirm title="是否要彻底删除改商品？" v-if="searchForm.tab == 'delete'" confirm-button-text="确认" cancel-button-text="取消" @confirm="cleanOut">
            <template #reference>
              <el-button size="small" type="danger">彻底删除</el-button>
            </template>
        </el-popconfirm>
        <el-button  size="small" @click="moreUnmount(1)" v-show="searchForm.tab == 'all' || searchForm.tab == 'off'">上架</el-button>
        <el-button  size="small" @click="moreUnmount(0)" v-show="searchForm.tab == 'all' || searchForm.tab == 'saling'">下架</el-button>
      </ListHeader>

      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading" :height="tableHeight" @selection-change="handleSelectionChange" ref="tableRef">
        <el-table-column type="selection" width="55" />
        <el-table-column label="商品" width="300">
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
              <el-button size="small" @click="setGoodsSkus(scope.row)" :loading="scope.row.goodsSkusLoading" :type="(scope.row.sku_type == 0 && !scope.row.sku_value) || 
              (!scope.row.goods_skus.length && scope.row.sku_type == 1) ? 'danger' : 'primary'">商品规格</el-button>
              <el-button size="small" @click="setBanners(scope.row)" :type="!scope.row.goods_banner.length ? 'danger' : 'primary'" :loading="scope.row.bannersLoading">设置轮播图</el-button>
              <el-button size="small" :type="!scope.row.content ? 'danger' : 'primary'" @click="setGoodsContent(scope.row)" :loading="scope.row.contentLoading">商品详情</el-button> 
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
          <el-form :model="form" ref="formRef" :rules="rules" label-width="85px" :inline="false">
            <el-form-item label="商品名称" prop="title"> 
              <el-input v-model="form.title" placeholder="请输入商品名称,不能超过60个字符"></el-input>
            </el-form-item>
            <el-form-item label="封面" prop="cover"> 
              <ChooseImage v-model="form.cover"></ChooseImage>
            </el-form-item>
            <el-form-item label="商品分类" prop="category_id"> 
              <el-select v-model="form.category_id" placeholder="请选择商品分类" size="small" clearable>
                  <el-option v-for="item in category_list" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="商品描述" prop="desc"> 
              <el-input v-model="form.desc" placeholder="请输入商品卖点" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="unit"> 
              <el-input v-model="form.unit" placeholder="请输入单位"></el-input>
            </el-form-item>
            <el-form-item label="总库存" prop="stock"> 
              <el-input-number v-model="form.stock" :min="0" :step="1" step-strictly></el-input-number>
            </el-form-item>
            <el-form-item label="库存预警" prop="min_stock"> 
              <el-input-number v-model="form.min_stock" :min="0" :step="1" step-strictly></el-input-number>
            </el-form-item>
            <el-form-item label="最低销售价" prop="min_price"> 
              <el-input-number v-model="form.min_price" :min="0" :step="1" step-strictly></el-input-number>
            </el-form-item>
            <el-form-item label="最低原价" prop="min_oprice"> 
              <el-input-number v-model="form.min_oprice" :min="0" :step="1" step-strictly></el-input-number>
            </el-form-item>
            <el-form-item label="库存显示" prop="stock_display"> 
              <el-radio-group v-model="form.stock_display">
                <el-radio label="0">隐藏</el-radio>
                <el-radio label="1">显示</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否上架" prop="status"> 
              <el-radio-group v-model="form.status">
                <el-radio label="0">放入仓库</el-radio>
                <el-radio label="1">立即上架</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
      </FormDrawer>

      <!-- 轮播图区域 -->
      <FormDrawer ref="bannersRef" title="设置轮播图" @submit="handleBannersSubmit" destroy-on-close>
          <el-form :model="bannersForm" ref="formRef" :rules="rules" label-width="85px" :inline="false">
            <el-form-item label="轮播图"> 
              <ChooseImage v-model="bannersForm.banners" multiple></ChooseImage>
            </el-form-item>
          </el-form>
      </FormDrawer>

      <!-- 商品详情区域 -->
      <FormDrawer ref="contentRef" title="设置商品详情" @submit="handleContentSubmit" destroy-on-close>
        <el-form :model="goodsForm">
          <el-form-item>
            <Editor v-model="goodsForm.content"></Editor>
          </el-form-item>
        </el-form>
      </FormDrawer>

      <!-- 商品规格 -->
      <FormDrawer ref="skusRef" title="商品规格" @submit="handleGoodsSkusSubmit" destroy-on-close size="70%">
        <el-form :model="skusForm">
          <el-form-item label="规格类型">
            <el-radio-group v-model="skusForm.sku_type">
              <el-radio :label="0" border>单规格</el-radio>
              <el-radio :label="1" border>多规格</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="skusForm.sku_type == 0">
            <el-form-item label="市场价格">
              <el-input v-model="skusForm.sku_value.oprice" style="width: 35%;">
                <template #append>
                  元
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="销售价格">
              <el-input v-model="skusForm.sku_value.pprice" style="width: 35%;">
                <template #append>
                  元
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="成本价格">
              <el-input v-model="skusForm.sku_value.cprice" style="width: 35%;">
                <template #append>
                  元
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input v-model="skusForm.sku_value.weight" style="width: 35%;">
                <template #append>
                  公斤
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="商品体积">
              <el-input v-model="skusForm.sku_value.volume" style="width: 35%;">
                <template #append>
                  立方米
                </template>
              </el-input>
            </el-form-item>
          </template>
          <template v-else>
            <SkuCard></SkuCard>
            <SkuTable></SkuTable>
          </template>
        </el-form>
      </FormDrawer>
    </el-card>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import FormDrawer from '@/components/FormDrawer.vue';
import ChooseImage from '@/components/ChooseImage.vue';
import { getGoodsList,updateGoodsStatus,createGoods,updateGoods,deleteGoods,readGoods,setGoodsBanner,updateGoodsSkus,restoreGoods,destroyGoods } from '@/api/goods.js';
import {useInitTable,useInitForm} from '@/composables/useCommon.js';
import ListHeader from '@/components/ListHeader.vue';
import { getCategoryList } from '@/api/category.js';
import Search from '@/components/Search.vue';
import SearchItem from '@/components/SearchItem.vue';
import { toast } from '@/composables/util.js';
import Editor from '@/components/Editor.vue';
import SkuCard from './components/SkuCard.vue';
import SkuTable from './components/SkuTable.vue';
import { initSkuCardList,goodsId,sku_list } from '@/composables/useSku.js';
  
const { searchForm,reset,tableData,loading,currentPage,total,limit,getData,handleDelete,handleSelectionChange,tableRef,
  moreDelete,moreUnmount,moreRecover,cleanOut} = useInitTable({
  getList:getGoodsList,
  delete:deleteGoods,
  recover:restoreGoods,
  updateStatus:updateGoodsStatus,
  thoroughlyDelete:destroyGoods,
  onGetListSuccess:(res)=>{
    tableData.value = res.list.map(o=>{
      o.bannersLoading = false
      o.contentLoading = false
      o.goodsSkusLoading = false
      return o
    })
    total.value = res.totalCount
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
    title:"",	 		
    category_id:null,
    cover:"",
    desc:"", 
    unit:"件",
    stock:100,
    min_stock:0,
    status:1,
    stock_display:1,
    min_price:0,
    min_oprice:0,
  }
})

const tableHeight = computed(()=>{
    return (window.innerHeight - 380) + 'px';
  }
)

const bannersRef = ref(null)
const contentRef = ref(null)
const skusRef = ref(null)

const bannersForm = reactive({
  banners:[]
})

const goodsForm = reactive({
  content:""
})

const skusForm = reactive({
  sku_type:0,
  sku_value:{
    oprice:0,
    pprice:0,
    cprice:0,
    weight:0,
    volume:0
  }
})

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

onMounted(() => {
  getCategoryList().then(res=>{
    category_list.value = res
  })
})

const handleBannersSubmit = ()=>{
  setGoodsBanner(goodsId.value,bannersForm).then(res=>{
    toast("设置轮播图成功")
    bannersRef.value.close()
    bannersRef.value.showLoading()
    getData()
  }).finally(()=>{
    bannersRef.value.hideLoading()
  })
}

//商品详情提交
const handleContentSubmit = ()=>{
  updateGoods(goodsId.value,goodsForm).then(res=>{
    toast("设置商品详情成功")
    contentRef.value.close()
    contentRef.value.showLoading()
    getData()
  }).finally(()=>{
    contentRef.value.hideLoading()
  })
}

//商品规格提交
const handleGoodsSkusSubmit = ()=>{
  // 单规格
  let data = {
    sku_type:skusForm.sku_type,
    sku_value:skusForm.sku_value,
  }
  //多规格
  if(skusForm.sku_type == 1){
    data.goodsSkus = sku_list.value
  }

  updateGoodsSkus(goodsId.value,data).then(res=>{
    toast("设置商品规格成功")
    skusRef.value.close()
    skusRef.value.showLoading()
    getData()
  }).finally(()=>{
    skusRef.value.hideLoading()
  })
}

//打开轮播图
const setBanners = (val)=>{
  goodsId.value = val.id
  val.bannersLoading = true
  readGoods(goodsId.value).then(res=>{
    bannersForm.banners = res.goodsBanner.map(o => o.url)
    bannersRef.value.open()
  }).finally(()=>{
    val.bannersLoading = false;
  })
}
//设置商品详情
const setGoodsContent = (val)=>{
  goodsId.value = val.id
  val.contentLoading = true
  readGoods(goodsId.value).then(res=>{
    goodsForm.content = res.content
    contentRef.value.open()
  }).finally(()=>{
    val.contentLoading = false
  })
}

//商品规格
const setGoodsSkus = (val)=>{
  goodsId.value = val.id
  val.goodsSkusLoading = true
  readGoods(goodsId.value).then(res =>{
    skusForm.sku_type = res.sku_type
    skusForm.sku_value = res.sku_value || {
      oprice:0,
      pprice:0,
      cprice:0,
      weight:0,
      volume:0
    }
    initSkuCardList(res)
    
    skusRef.value.open()
  }).finally(()=>{
    val.goodsSkusLoading = false
  })
}

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
  
