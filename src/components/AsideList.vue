<template>
  <div class="aside-list rose-f-row rose-font-s3 rose-bg2 rose-f1" :class="{'rose-bg-p1' : active}">
    <span class="rose-text-overflow span-title">
        <slot></slot>
    </span>
    <el-button text type="primary" size="small" @click="$emit('edit')">
      <el-icon :size="12"><Edit /></el-icon>
    </el-button>
    <el-button text type="primary" size="small" @click="$emit('close')">
      <el-icon :size="12"><Close /></el-icon>
    </el-button>
  </div>
</template>
<script setup>
defineProps({
    active:{
        type:Boolean,
        default:false
    }
})

defineEmits(['edit','close'])

</script>
<style lang="less">

.aside-list {
  border-bottom: 1px solid var(--rose-g2);
  align-items: center;
  height:50px;
  padding: 0 var(--common-split);
  .span-title {
    width: 80%;
  }
  &:hover {
    cursor: pointer;
    background-color: var(--rose-p3);
  }
}

</style>
