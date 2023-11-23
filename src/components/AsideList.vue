<template>
  <div class="aside-list rose-f-row rose-font-s3 rose-bg2 rose-f1" :class="{'rose-bg-p1' : active}">
    <span class="rose-text-overflow span-title">
        <slot></slot>
    </span>
    <el-button text type="primary" size="small" @click.stop="$emit('edit')">
      <el-icon :size="12"><Edit /></el-icon>
    </el-button>
    <span @click.stop="()=>{}" class="stop">
      <el-popconfirm title="是否要删除改分类？" confirm-button-text="确认" cancel-button-text="取消" @confirm="$emit('close')">
          <template #reference>
              <el-button text type="primary" size="small">
                  <el-icon :size="12"><Close /></el-icon>
              </el-button>
          </template>
      </el-popconfirm>
    </span>
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
  .stop{
    margin-left: var(--common-split);
  }
  .span-title {
    width: 80%;
  }
  &:hover {
    cursor: pointer;
    background-color: var(--rose-p3);
  }
}

</style>
