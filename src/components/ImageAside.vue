<template>
  <el-aside width="220px" class="image-aside rose-p-r" v-loading="loading">
    <div class="top rose-p-a-0">
      <el-scrollbar>
        <AsideList v-for="(item,index) in list" :key="index" :active="activeId == item.id">
          {{ item.name }}
        </AsideList>
      </el-scrollbar> 
    </div>
    <div class="bottom rose-f-row rose-f-c">分页部分</div>
  </el-aside>
</template>
<script setup>
import { getImageClassList } from '@/api/imageClass.js'
import {  onMounted,ref } from "vue";
import AsideList from "@/components/AsideList.vue";

const loading = ref(false)
const list = ref([])
const activeId = ref(0)

const getData = () => {

  loading.value = true
  getImageClassList(1).then((res)=>{
    list.value = res.list
    let item = list.value[0]
    if(item){
      activeId.value = item.id
    }

  }).finally(()=>{
    loading.value = false
  })
}

onMounted(() => {
  getData()
})

</script>
<style lang="less">
.image-aside{
  border-right: 2px solid var(--rose-g2);
}

.image-aside .top{
    bottom: 50px;
}

.image-aside .bottom{
    position: absolute;
    bottom: 0;
    left:0;
    right:0;
    height: 50px;
}

</style>
