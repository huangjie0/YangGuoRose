<template>
  <div>
    <div
      class="choose-image-btn rose-br-s1 rose-f-row rose-f-c rose-cursor"
      @click="openDialog"
    >
      <el-icon :size="25"><Plus /></el-icon>
    </div>
    <ChooseImageDialog ref="chooseImageRef" title="选择图片" top="3%" width="85%">
      <template #content>
        <el-container
          class="rose-bg-w rose-br-s1 rose-container"
          style="height:70vh"
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
            <ImageMian ref="imageMainRef"></ImageMian>
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
import { ref } from "vue";

const chooseImageRef = ref();

const openDialog = () => {
  chooseImageRef.value.open();
};

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

</script>
<style lang="less">

.choose-image-btn {
  width: 100px;
  height: 100px;
  background-color: var(--rose-g2);
  &:hover {
    background-color: var(--rose-g3);
  }
}
.rose-container{
  height:70vh;
}



</style>
