<template>
     <div class="rose-f-row rose-f1">
        <el-button type="primary" size="small" @click="$emit('create')">新增</el-button>
        <el-tooltip content="刷新" placement="top">
          <el-button text @click="$emit('refresh')">
            <el-icon :size="20"><Refresh /></el-icon>
          </el-button>
        </el-tooltip>
    </div>
</template>
<script setup>
defineEmits(["create","refresh"])
</script>
<style lang="less">
    
</style>