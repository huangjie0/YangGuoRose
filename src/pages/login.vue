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
            <el-form :model="form" :rules="rules" ref="loginRef">
                <el-form-item prop="userName">
                    <el-input v-model="form.userName" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <UserFilled />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="passWord">
                    <el-input v-model="form.passWord" placeholder="请输入密码" type="password" show-password>
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <Platform />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button round type="primary" color="#a781ee" @click="onSubmit" class="btn-w">登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { login } from '@/api/manager.js'
import { ElNotification } from 'element-plus'
const loginRef = ref(null)

const form = reactive({
    userName: '',
    passWord: '',
})

const rules = {
    userName: [{
        required: true,
        message: '用户名不能为空！',
        trigger: 'blur'
    },
    ],
    passWord: [{
        required: true,
        message: '密码不能为空！',
        trigger: 'blur'
    }]
}

const onSubmit = () => {
    loginRef.value.validate((vaild) => {
        if (!vaild) {
            return false
        }
        console.log('通过');
        login(form.userName, form.passWord).
            then((res) => {
                console.log(res.data.data);
                //提示成功
                //存储用户token
                //跳转到首页
            }).catch((err) => {
                console.log(err.response.data.msg);
                ElNotification({
                    message: err.response.data.msg || '请求失败',
                    type: 'error',
                    duration:3000
                })
            })
    })
}

</script>
<style scoped lang="less">
.el-button {
    color: var(--rose-w);
}

.btn-w {
    width: 250px;
}

.login-title {
    margin: 25px 0;
    color: var(--rose-g1);
    font-size: 15px;

    .line {
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