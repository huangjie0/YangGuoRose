<template>
    <el-row class="rose-bg-p rose-vh">
        <el-col :span="16" class="rose-f-c left rose-f-column">
            <div>
                <div class="hello rose-font-w2">欢迎光临</div>
                <div class="title">洋果子后台系统</div>
            </div>
        </el-col>
        <el-col :span="8" class="rose-bg-w rose-f-c rose-f-column">
            右边
        </el-col>
    </el-row>
</template>
<script setup>
import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})

const onSubmit = () => {
    console.log('submit!')
}

</script>
<style scoped lang="less">
.left {
    color: var(--rose-w);

    .hello {
        font-size: 50px;
    }

    .title {
        font-size: 18px;
    }
}
</style>