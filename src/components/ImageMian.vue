<template>
  <el-main class="image-main rose-p-r" v-loading="loading">
    <div class="top rose-p-a-0">
      <el-scrollbar>
        <el-row :gutter="10">
          <el-col :span="6" v-for="(item,index) in list" :key="index" class="image-col">
            <el-card shadow="always" :body-style="{ padding:0 }">
              <el-image :src="item.url" fit="cover" class="image" :preview-src-list="[item.url]" :initial-index="0"></el-image>
              <div class="rose-text-overflow image-title">{{ item.name }}</div>
              <div class="rose-f-row rose-f-c">
                <el-checkbox v-model="item.checked" @change="handleChooseChange(item)" v-if="openChoose"/>
                <el-button size="small" text @click="handleEdit(item)">重命名</el-button>
                <el-popconfirm title="是否要删除改图片？" confirm-button-text="确认" cancel-button-text="取消" @confirm="handleDelete(item.id)">
                  <template #reference>
                    <el-button size="small" text>删除</el-button>
                  </template>
                </el-popconfirm>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-scrollbar>
    </div>
    <div class="bottom rose-f-row rose-f-c">
      <el-pagination
        background
        layout="prev,pager,next"
        :total="total"
        :current-page="currentPage"
        :page-size="limit"
        @current-change="getData"
      />
    </div>
  </el-main>
  <!-- 上传图片 -->
  <FormDrawer :showButton="false" title="上传图片" ref="formDrawer">
    <UploadFile :data="{ imageClassId }" @success="uploadSuccess"></UploadFile>
  </FormDrawer>
</template>
<script setup>
import { getImageList , updateImage , deleteImage } from "@/api/image.js";
import { onMounted , ref , computed } from "vue";
import { showPrompt, toast } from '@/composables/util.js';
import UploadFile from "@/components/UploadFile.vue";
import FormDrawer from "@/components/FormDrawer.vue";

//分页
const currentPage = ref(1); 
const total = ref(0);
const limit = ref(10);
const loading = ref(false);
const list = ref([]);
const imageClassId = ref(0);
const formDrawer = ref(null);

const getData = (page = null) => {
  if (typeof page == "number") {
    currentPage.value = page;
  }

  loading.value = true;
  getImageList(imageClassId.value , currentPage.value)
    .then((res) => {
      total.value = res.totalCount;
      list.value = res.list.map(o => {
        o.checked = false
        return o
      })

    })
    .finally(() => {
      loading.value = false;
    });
};

//根据分类id重新加载图片列表
const loadData = (id) => {
  currentPage.value = 1
  imageClassId.value = id
  getData()
}

const uploadSuccess = ()=>{
  getData(1)
}

defineExpose({
  loadData,
  formDrawer
})

defineProps({
  openChoose:{
    type:Boolean,
    default:false
  }
})
//修改图片
const handleEdit = (item)=>{
  showPrompt('重命名',item.name).then(({ value })=>{
    loading.value = true
    updateImage(item.id,value).then(res=>{
      toast('修改成功')
      getData()
    }).finally(()=>{
      loading.value = false
    })
  })
}
//删除图片
const handleDelete = (id)=>{
  loading.value = true
  deleteImage([id]).then((res)=>{
    toast('删除成功')
    getData()
  }).finally(()=>{
    loading.value = false
  })
}

//选中图片
const checkImage = computed(()=> list.value.filter(o => o.checked))

const emit = defineEmits(['choose'])

const handleChooseChange = (item)=>{
  if(item.checked && checkImage.value.length > 1){ 
    item.checked = false
    return toast('最多选择一张图片！','warning')
  }
  emit("choose",checkImage.value)
}

</script>
<style lang="less">
.image-main .top {
  bottom: 50px;
  padding:0 15px;
}

.image-main .bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
}
.image{
  width:100%;
  height:150px;
}

.image-title{
  text-align:center;
}

.image-col{
  margin-bottom:15px;
}

</style>
