<template>
  <div class="rose-w-h-100">
  <el-scrollbar height="115px">
      <div class="rose-f-row rose-w-h-100">
        <div>
          <div class="imageSize rose-p-r">
            <!-- 单选部分 -->
            <div v-if="!multiple"  class="rose-f-row image-container">
              <el-image :src="modelValue" fit="cover" class="imageSize rose-br-s1" :preview-src-list="srcList" ></el-image>
              <div
                class="choose-image-btn rose-f-c rose-ml-1"
                @click="openDialog"
              >
                <el-icon :size="25" class="imageSize"><Plus /></el-icon>
              </div>
            </div>
            <!-- 多选部分 -->
            <div v-else class="rose-f-row">
              <div class="imageSize rose-mr-1 rose-p-r" v-for="(url,index) in modelValue" :key="index">
                <el-icon class="rose-p-a rose-z-index rose-bg-w rose-br-s1 rose-cursor" @click="closeImage(url)" v-if="multiple"><CloseBold /></el-icon>
                <el-image :src="url" fit="cover" class="imageSize rose-br-s1" :preview-src-list="srcList"></el-image>
              </div>
              <div
                class="choose-image-btn rose-f-c"
                @click="openDialog"
              >
                <el-icon :size="25" class="imageSize"><Plus /></el-icon>
              </div>
            </div>
          </div>
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
            <ImageMian ref="imageMainRef" @choose="handleChoose" openChoose :multiple="multiple"></ImageMian>
          </el-container>
        </el-container>
      </template>
    </ChooseImageDialog>
    </el-scrollbar>
  </div>
</template>
<script setup>
import ChooseImageDialog from "@/components/CommonDialog.vue";
import ImageAside from '@/components/ImageAside.vue';
import ImageMian from '@/components/ImageMian.vue';
import { ref , computed  } from "vue";

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
  modelValue:[String,Array],
  multiple:{
    type:Boolean,
    default:false
  }
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
  if(!props.multiple){
    urls.value = urls.value[0]
  }
  emit('update:modelValue',urls.value)
  closeDialog()
}

//关闭小图片
const closeImage =(url)=>{
  const uImage = props.modelValue.filter(u=>u !== url)
  emit('update:modelValue', uImage)
}

defineExpose({
  openDialog
})

</script>
<style lang="less">
.choose-image-btn {
  background-color: var(--rose-g2);
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

.image-container{
  width: 210px;
}

</style>
