<template>
    <div class="rose-bg-p fheader rose-f-row">
        <span class="logo rose-f-c rose-font-w3">
            <el-icon class="title-logo">
                <ElemeFilled />
            </el-icon>
            洋果子Rose
        </span>
        <el-icon class="icon-btn rose-f-c">
            <Fold />
        </el-icon>
        <el-tooltip effect="dark" content="刷新" placement="bottom">
            <el-icon class="icon-btn rose-f-c" @click="handleRefresh">
                <Refresh />
            </el-icon>
        </el-tooltip>
        <div class="lft-auto">
            <el-tooltip effect="dark" content="全屏" placement="bottom">
                <div class="fullScreen">
                    <el-icon @click="toggle">
                        <FullScreen v-if="!isFullscreen" />
                        <Aim v-else/>
                    </el-icon>
                </div>
            </el-tooltip>
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <el-avatar :size="25" :src="$store.state.user.avatar" />
                    {{ $store.state.user.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup>
import { showModal, toast } from '@/composables/util.js'
import { logOut } from '@/api/manager.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useFullscreen } from '@vueuse/core'

const router = useRouter()
const store = useStore()
const { toggle , isFullscreen } = useFullscreen()
const handleLogout = () => {
    showModal('是否要退出登录？').then((res) => {
        logOut().finally(() => {
            store.dispatch('logout')
            //跳转登录页
            router.push('/login')
            //提示
            toast('退出登录成功！')
        })
    })
}
const handleCommand = (c) => {
    switch (c) {
        case 'rePassword':
            console.log(1111);
            break;
        case 'logout':
            handleLogout()
            break;
    }
}
const handleRefresh = ()=>{
    window.location.reload()
}

</script>

<style lang="less" scoped>
.fheader {
    color: var(--rose-w);
    height: 64px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    align-items: center;

    .icon-btn {
        width: 42px;
        height: 64px;
        cursor: pointer;
    }

    .logo {
        width: 250px;
        font-size: 20px;

        .title-logo {
            margin-right: 10px;
        }
    }

    .lft-auto {
        margin-left: auto;
        padding-right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        .el-dropdown{
            display: flex;
            align-items: center;
        }
        .fullScreen{
            width: 50px;
            height: 100%;
            display: flex;
            justify-content: center;
            cursor: pointer;
        }

        .el-dropdown-link{
            color: var(--rose-w);
        }
    }
}
</style>