<template>
  <el-main class="image-main rose-p-r" v-loading="loading">
    <div class="top rose-p-a-0">
      <el-scrollbar>
        <el-row :gutter="10">
          <el-col :span="6" v-for="(item,index) in list" :key="index">
            <el-card shadow="always" :body-style="{ padding:0 }">
              <el-image :src="item.url" fit="cover" class="image"></el-image>
              <div class="rose-text-overflow image-title">{{ item.name }}</div>
              <div class="rose-f-row rose-f-c">
                <el-button size="small" text>重命名</el-button>
                <el-button size="small" text>删除</el-button>
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
</template>
<script setup>
import { getImageList } from "@/api/image.js";
import { onMounted , ref } from "vue";

//分页
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);
const loading = ref(false);
const list = ref([]);
const imageClassId = ref(0);

const getData = (page = null) => {
  if (typeof page == "number") {
    currentPage.value = page;
  }

  loading.value = true;
  getImageList(imageClassId.value , currentPage.value)
    .then((res) => {
      total.value = res.totalCount;
      list.value = res.list;
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

defineExpose({
  loadData
})

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

.el-col{
  margin-bottom:20px;
}

.image-title{
  text-align:center;
}

</style>
