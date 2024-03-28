<template>
    <el-row :gutter="20" >
        <el-col :span="6" :offset="0" v-for="(item,index) in list" :key="index">
            <el-card shadow="never">
                <div class="rose-f-row" style="align-items: center;">
                    <el-icon :size="20">
                        <User style="color:#a4e2c6;" v-if="index == 0"/>
                        <coffee-cup style="color:#44cef6;" v-if="index == 1"/>
                        <cold-drink style="color:#b0a4e3;" v-if="index == 2"/>
                        <dessert style="color:#fff143" v-if="index == 3"/>
                    </el-icon>
                    <div class="rose-ml-1">
                        <h2>{{ item.value }}</h2>
                        <small class="rose-bg">{{ item.label }}</small>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
<script setup>
import { ref } from 'vue';
import { getAgentStatistics } from '@/api/distribution.js';

const loading = ref(false);
const list = ref([]);

loading.value = true;
getAgentStatistics().then(res=>{
    list.value = res.panels

}).finally(()=>{
    loading.value = false;
})

</script>
<style lang="less" scoped>

</style>