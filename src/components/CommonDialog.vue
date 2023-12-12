<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :width="width"
    :top="top"
    :fullscreen="isFullScreen"
  >
    <slot name="content"></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref }  from 'vue'

const dialogVisible = ref(false)

defineProps({
    title:{
        default:'',
        type:String
    },
    width:{
        default:'30%',
        type:String
    },
    top:{
        default:'20%',
        type:String
    },
    isFullScreen:{
        default:false,
        type:Boolean
    }
})

const emit = defineEmits(['submit'])

const submit = ()=>{
  emit('submit')
}

//打开弹框方法
const open = ()=>{
    dialogVisible.value = true
}

//关闭弹框
const close = () => { 
  dialogVisible.value = false
}

defineExpose({
    open,
    close
})

</script>
<style lang="less" scoped>
</style>
