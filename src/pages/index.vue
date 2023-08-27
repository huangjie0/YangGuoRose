<template>
    <div>
        后台首页
        {{ $store.state.user.username }}
        <el-button @click="handleLogout">退出登录</el-button>
    </div>
</template>
<script setup>
import { showModal,toast } from '@/composables/util.js'
import { logOut } from '@/api/manager.js'
import { useRouter } from 'vue-router' 
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
const handleLogout = ()=>{
    showModal('是否要退出登录？').then((res)=>{
        logOut().finally(()=>{
            store.dispatch('logout')
            //跳转登录页
            router.push('/login')
            //提示
            toast('退出登录成功！')
        })
    })
}
</script>
<style lang="less" scoped>

</style>