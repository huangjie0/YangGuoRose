<template>
  <div>
      <div class="rose-f-row">
        <div v-if="modelValue">
          <el-image :src="modelValue" fit="cover" class="imageSize rose-br-s1" :preview-src-list="srcList" v-if="typeof modelValue == 'string'"></el-image>
          <div v-else class="rose-f-row rose-f-w">
            <div class="imageSize rose-mr-1" v-for="(url,index) in modelValue" :key="index">
              <el-image :src="url" fit="cover" class="imageSize rose-br-s1" :preview-src-list="srcList"></el-image>
            </div>
          </div>
        </div>
        <div
          class="choose-image-btn rose-br-s1 rose-f-row rose-f-c rose-cursor"
          @click="openDialog"
        >
          <el-icon :size="25"><Plus /></el-icon>
        </div>
      </div>
    <ChooseImageDialog ref="chooseImageRef" title="选择图片" top="3%" width="85%" @submit="handleSubmit">
      <template #content>
        <el-container
          class="rose-bg-w rose-br-s1 rose-container"
        >
          <el-header class="image-header rose-f-row">
            <el-button type="primary" size="small" @click="handleOpenCreate"
              >新增图片分类</el-button
            >
            <el-button type="primary" size="small" @click="uploadImage"
              >上传图片</el-button
            >
          </el-header>
          <el-container>
            <ImageAside ref="imageAsideRef" @change="handleChange"></ImageAside>
            <ImageMian ref="imageMainRef" @choose="handleChoose" openChoose></ImageMian>
          </el-container>
        </el-container>
      </template>
    </ChooseImageDialog>
  </div>
</template>
<script setup>
import ChooseImageDialog from "@/components/CommonDialog.vue";
import ImageAside from '@/components/ImageAside.vue';
import ImageMian from '@/components/ImageMian.vue';
import { ref , computed } from "vue";

const chooseImageRef = ref();
const urls = ref([])

const openDialog = () => {
  chooseImageRef.value.open();
};

const closeDialog = () => {
  chooseImageRef.value.close();
}

const imageAsideRef = ref(null);
const imageMainRef = ref(null);

const handleOpenCreate = () => {
  imageAsideRef.value.handleCreate()
}

const handleChange = (id)=>{
  imageMainRef.value.loadData(id)
}

const uploadImage = ()=>{
  imageMainRef.value.formDrawer.open()
}

const props = defineProps({
  modelValue:[String,Array]
})

const srcList = computed( ()=> props.modelValue ? [props.modelValue] : [])

const emit = defineEmits(['update:modelValue'])

const handleChoose = (e)=>{
  urls.value = e.map((o)=>{
    return o.url
  })
}

//点击确定所触发的事件
const handleSubmit = ()=>{
  if(urls.value.length){
    emit('update:modelValue', urls.value[0])
    chooseImageRef.value.close()
  }
}

</script>
<style lang="less">

.choose-image-btn {
  width: 100px;
  height: 100px;
  background-color: var(--rose-g2);
  margin-left:10px;
  &:hover {
    background-color: var(--rose-g3);
  }
}
.rose-container{
  height:70vh;
}

.imageSize{
  width:100px;
  height:100px;
}
</style>
