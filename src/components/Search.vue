<template>
    <el-form :model="searchForm" label-width="80px" class="search-form" size="small">
        <el-row :gutter="20">
            <slot></slot>
            <template v-if="showSearch">
                <slot name="show"></slot>
            </template>
            <el-col :span="8" :offset="showSearch ? 0 : 8">
                <div class="rose-f-row searchForm-flex">    
                <el-button type="primary" @click="$emit('search')">搜索</el-button>
                <el-button @click="$emit('reset')">重置</el-button>
                <el-button text @click="showSearch = !showSearch">{{ showSearch ? '收起' : '展开' }}
                    <el-icon>
                    <DArrowLeft v-if="showSearch"/>
                    <DArrowRight v-else/>
                    </el-icon>
                </el-button>
                </div>
            </el-col>
        </el-row>
    </el-form>
</template>
<script setup>
import { ref } from 'vue';

const showSearch = ref(false)

defineEmits('search','reset')

</script>
<style lang="less">
    
</style>