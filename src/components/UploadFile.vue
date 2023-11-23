<template>
  <el-upload
    class="upload-demo"
    drag
    :action="UPLOADIMAGEACTION"
    multiple
    :headers = "{ token }"
    :data="data"
    name="img"
    :on-success="uploadSuccess"
    :on-error="uploadError"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
        请选择要上传的图片
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png文件大小不超过500kb
      </div>
    </template>
  </el-upload>
</template>
<script setup>
import { ref } from "vue";
import { UPLOADIMAGEACTION } from "@/api/image.js";
import { getToken } from "@/composables/auth.js";
import { toast } from "@/composables/util.js";

defineProps({
    data:Object
})

const token = getToken()

const emits = defineEmits(['success'])

//上传成功
const uploadSuccess = (response, uploadFile, uploadFiles)=>{
    console.log(response);
    emits('success',{
        response, uploadFile, uploadFiles
    })
}

//上传失败
const uploadError = (error, uploadFile, uploadFiles)=>{
    let msg = JSON.parse(error.message).msg || '上传失败'
    toast(msg,'error')
}

</script>
<style lang="less">

</style>
