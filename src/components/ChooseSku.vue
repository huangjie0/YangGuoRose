<template>
    <ChooseSkuDialog title="规格选择" width="80%" top="4%" @submit="handleSkusSubmit" ref="skuDialogRef">
        <template #content>
            <el-container>
                <el-aside width="220px" class="image-aside rose-p-r" v-loading="loading">
                    <!-- top部分 -->
                    <!-- <div class="top rose-p-a-0">
                        <el-scrollbar>
                            <AsideList
                            v-for="(item, index) in list"
                            :key="index"
                            :active="activeId == item.id"
                            @edit="handleEdit(item)"
                            @close="handleClose(item.id)"
                            @click="handleChangeActiveId(item.id)"
                            >
                            {{ item.name }}
                            </AsideList>
                        </el-scrollbar>
                    </div> -->
                    <!-- bottom部分 -->
                    <!-- <div class="bottom rose-f-row rose-f-c">
                        <el-pagination
                            background
                            layout="prev,next"
                            :total="total"
                            :current-page="currentPage"
                            :page-size="limit"
                            @current-change="getData"
                        />
                    </div> -->
                </el-aside>
                <el-main>
                    内容
                </el-main>
            </el-container>
        </template>
    </ChooseSkuDialog>
</template>
<script setup>
import { ref } from 'vue';
import ChooseSkuDialog from './CommonDialog.vue';


const handleSkusSubmit = ()=>{

}

const skuDialogRef = ref(null)

defineExpose({
    skuDialogRef
})

</script>
<style lang="less" scoped>
.el-container{
    height: 65vh;
}
</style>