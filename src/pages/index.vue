<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6" v-for="(item,index) in panels" :key="index">
                <el-card  shadow="always">
                    <template #header>
                        <div class="rose-f1">
                            <span class="rose-font-s2">{{ item.title }}</span>
                            <el-tag :type="item.unitColor" effect="plain">
                                {{ item.unit }}
                            </el-tag>
                        </div>
                    </template>
                    <span class="rose-font-s1 rose-font-w2 count-value">
                        {{ item.value }}
                    </span>
                    <el-divider />
                    <div class="rose-f1 rose-font-s3 rose-bg">
                        <span>{{ item.subTitle }}</span>
                        <span>{{ item.subValue }} </span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script setup>
import { getStatistics1 } from '@/api/index.js'
import { onMounted , ref } from 'vue'

const panels = ref([])
     
const getDate = () => {
    getStatistics1().then((res) => {
        panels.value = res.panels
        console.log(panels.value);
    })
}

onMounted(() => {
    getDate()
})
                                                     
</script>
<style lang="less" scoped>
.count-value{
    color: var(--rose-g4);
}
</style>    