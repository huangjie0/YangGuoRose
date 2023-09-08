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
        <el-icon class="icon-btn rose-f-c">
            <Refresh />
        </el-icon>
        <div class="lft-auto">
            <el-icon>
                <FullScreen />
            </el-icon>
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-avatar :size="25" :src="$store.state.user.avatar"/>
                    {{ $store.state.user.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>修改密码</el-dropdown-item>
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup>


</script>

<style lang="less" scoped>
.fheader{
    color: var(--rose-w);
    height: 64px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    align-items: center;
    .icon-btn{
        width: 42px;
        height: 64px;
        cursor: pointer;
    }
    .logo{
        width: 250px;
        font-size: 20px;
        .title-logo{
            margin-right: 10px;
        }
    }
    .lft-auto{
        margin-left: auto;
    }
}
</style>