<template>
    <div>
        <el-result icon="warning" title="404" subTitle="您的页面走丢了~">
            <template #extra>
                <el-button type="primary" size="default" @click="$router.push('/')">返回</el-button>
            </template>
        </el-result>
    </div>
</template>
<script setup>

</script>
<style scoped lang="less"> 

</style>