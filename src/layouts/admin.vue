<template>
    <el-container>
        <el-header>
            <Fheader></Fheader>
        </el-header>
        <el-container>
            <el-aside :width="$store.state.asideWidth">
                <Fmenu></Fmenu>
            </el-aside>
            <el-main>
                <!-- 标签导航部分 -->
                <Ftaglist></Ftaglist>
                <!-- 主要内容部分 -->
                <router-view v-slot="{ Componment }">
                    <keep-alive :max="10">
                        <component :is="Componment"></component>
                    </keep-alive>
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script setup>
import Fheader from './components/Fheader.vue';
import Fmenu from './components/Fmenu.vue';
import Ftaglist from './components/Ftaglist.vue';

</script>

<style lang="less" scoped>

.el-aside{
    transition:all 0.2s;
}

</style>