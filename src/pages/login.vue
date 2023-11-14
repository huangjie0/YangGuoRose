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
            <div class="rose-f1 login-title rose-font-s3">
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
                    <el-button round type="primary" color="#a781ee" @click="onSubmit" class="btn-w"
                        :loading="loading">登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>
<script setup>
import { reactive, ref ,onMounted , onBeforeUnmount} from 'vue'
import {toast} from '@/composables/util.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
const loginRef = ref(null)
const loading = ref(false)

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
        loading.value = true
        store.dispatch('login',form).then((res)=>{
            toast('登录成功！')
            router.push('/')
        }).finally(()=>{
            loading.value = false
        })
    })
}
onMounted(()=>{
    document.addEventListener('keyup',onKeyUp)
})
onBeforeUnmount(()=>{
    document.removeEventListener('keyup',onKeyUp)
})
const onKeyUp = (e)=>{
    if(e.key == 'Enter') onSubmit()
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
    margin: var(--common-split2) 0;
    color: var(--rose-g1);

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