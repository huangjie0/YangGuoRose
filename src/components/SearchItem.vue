<template>
    <el-col :span="8" :offset="0">
        <el-form-item :label="label">
            <!-- <el-input v-model="searchForm.title" placeholder="商品名称" clearable></el-input> -->
            <slot></slot>
        </el-form-item>
    </el-col>
</template>
<script setup>

defineProps({
    label:String
})

</script>
<style lang="less">
    
</style>