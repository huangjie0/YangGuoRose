<template>
  <el-drawer
    v-model="showDrawer"
    :size="size"
    :close-on-click-modal="false"
    :title="title"
    :destroy-on-close="destroyOnClose"
  >
  <div class="form-drawer rose-w-h-100 rose-f-column">
    <div class="body rose-f-1">
        <el-scrollbar>
            <slot></slot>
        </el-scrollbar>
    </div>
    <div class="actions rose-f-row" v-if="showButton">
        <el-button type="primary" @click="submit" :loading="loading">{{ confirmText }}</el-button>
        <el-button type="default" @click="close">取消</el-button>
    </div>
  </div>
  </el-drawer>
</template>
<script setup>
import { ref,reactive } from 'vue'

const showDrawer = ref(false)
const loading = ref(false)

//打开抽屉方法
const open = () => showDrawer.value = true
//关闭抽屉按钮
const close = () => showDrawer.value = false
//显示按钮加载
const showLoading = () => loading.value = true
//隐藏按钮
const hideLoading = () => loading.value = false
// 向父组件暴露方法
defineExpose({
    open,
    close,
    showLoading,
    hideLoading
})

const props = defineProps({
    title:String,
    size:{
        type:String,
        default:"45%"
    },
    destroyOnClose:{
        type:Boolean,
        default:false
    },
    confirmText:{
        type:String,
        default:"提交"
    },
    showButton:{
        type:Boolean,
        default:true
    }
})

const emits = defineEmits(["submit"])

//提交
const submit = ()=>{
    emits("submit")
}


</script>
<style lang="less">
.form-drawer{
    position:relative;

    .actions{
        height:50px;
        margin-top:auto;
        align-items: center;
    }

    .body{
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:50px;
    }
}
</style>
