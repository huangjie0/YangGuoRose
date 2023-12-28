<template>
     <div class="rose-f-row rose-f1">
      <div>
        <el-button type="primary" size="small" @click="$emit('create')" v-if="btns.includes('create')">新增</el-button>
        <el-button type="danger" size="small" @click="$emit('delete')" v-if="btns.includes('delete')">批量删除</el-button>
      </div>
        <el-tooltip content="刷新" placement="top">
          <el-button text @click="$emit('refresh')" v-if="btns.includes('refresh')">
            <el-icon :size="20"><Refresh /></el-icon>
          </el-button>
        </el-tooltip>
    </div>
</template>
<script setup>
import { computed } from 'vue'

const btns = computed(()=> props.layout.split(','))

defineEmits(["create","refresh","delete"])

const props = defineProps({
  layout:{
    type:String,
    default:"create,refresh"
  }
})

</script>
<style lang="less">
    
</style>