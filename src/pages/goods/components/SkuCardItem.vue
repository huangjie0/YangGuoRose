<template>
  <div v-loading="loading">
    <el-tag
      v-for="(tag,index) in item.goodsSkusCardValue"
      :key="index"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
      effect="plain"
    >
      {{ tag.text }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      class="w-20"
      size="small"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button v-else class="button-new-tag" size="small" @click="showInput">
     + 添加选项值
    </el-button>
  </div>
</template>
<script setup>
import { initSkusCardItem } from '@/composables/useSku.js';



const props = defineProps({
    skuCardId:[Number,String]
})

const { item,inputValue,inputVisible,InputRef,handleClose,showInput,handleInputConfirm,loading} = initSkusCardItem(props.skuCardId)


</script>
<style lang="less">
.el-tag{
  margin-right: 10px;
}
</style>