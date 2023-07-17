<template>
    <el-row style="height:100vh;background:rgb(167, 129, 238)">
        <el-col :span="16" class="left">
            <div>
                <div class="hello">欢迎光临</div>
                <div class="title">洋果子后台系统</div>
            </div>
        
        </el-col>
        <el-col :span="8" style="background:white">
            <h2>欢迎回来</h2>
            <div>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </el-col>
    </el-row>
</template>
<script setup>

</script>
<style scoped lang="less">
.left{
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    .hello{
        font-weight: 550;
        font-size: 50px;
    }
    .title{
        font-size: 18px;
    }
}
</style>