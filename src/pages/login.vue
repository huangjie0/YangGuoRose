<template>
    <el-row class="rose-bg-p rose-vh">
        <el-col :lg="16" :md="12" class="rose-f-c left rose-f-column">
            <div>
                <div class="hello rose-font-w2">欢迎光临</div>
                <div class="title">洋果子后台系统</div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="rose-bg-w rose-f-c rose-f-column">
            <h2 class="rose-font-w2 rose-font-s1">欢迎回来</h2>
            <div class="rose-f1 login-title">
                <span class="line"></span>
                <span>账号密码登录</span>
                <span class="line"></span>
            </div>
            <el-form :model="form">
                <el-form-item>
                    <el-input v-model="form.userName" placeholder="请输入用户名"/>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.passWord" placeholder="请输入密码"/>
                </el-form-item>
                <el-form-item>
                    <el-button round type="primary" color="#a781ee" @click="onSubmit" class="btn-w">登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>
<script setup>
import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
    userName: '',
    passWord: '',
})

const onSubmit = () => {
    console.log('submit!')
}

</script>
<style scoped lang="less">
.el-button{
    color: var(--rose-w);
}
.btn-w{
    width: 250px;
}
.login-title{
    margin: 25px 0;
    color: var(--rose-g1);
    font-size: 15px;
    .line{
        height: 1px;
        width: 50px;
        background-color: var(--rose-g1);
        margin: 0 5px;
    }
}
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