<template>
    <ChooseSkuDialog title="规格选择" width="80%" top="4%" @submit="handleSkusSubmit" ref="skuDialogRef">
        <template #content>
            <el-container>
                <el-aside width="220px" class="image-aside rose-p-r" v-loading="loading">
                    <!-- top部分 -->
                    <div class="top rose-p-a-0">
                        <el-scrollbar>
                            <AsideList
                            v-for="(item, index) in tableData"
                            :key="index"
                            :active="activeId == item.id"
                            @edit="handleEdit(item)"
                            @close="handleClose(item.id)"
                            @click="handleChangeActiveId(item.id)"
                            >
                            {{ item.name }}
                            </AsideList>
                        </el-scrollbar>
                    </div>
                    <!-- bottom部分 -->
                    <div class="bottom rose-f-row rose-f-c">
                        <el-pagination
                            background
                            layout="prev,next"
                            :total="total"
                            :current-page="currentPage"
                            :page-size="limit"
                            @current-change="getData"
                        />
                    </div>
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
import AsideList from "@/components/AsideList.vue";
import FormDrawer from "@/components/FormDrawer.vue";
 
const handleSkusSubmit = ()=>{

}

const skuDialogRef = ref(null);
const activeId = ref(0);

defineExpose({
    skuDialogRef
})

defineProps({
    total:{
        default:0,
        type:Number
    },
    currentPage:{
        default:0,
        type:Number
    },
    limit:{
        default:0,
        type:Number
    },
    getData:Function,
    loading:{
        default:false,
        type:Boolean
    },
    tableData:{
        default:[],
        type:Array
    }              
})

//修改
const handleEdit = ()=>{

}

//删除
const handleClose = ()=>{

}

const handleChangeActiveId = ()=>{

}

</script>
<style lang="less" scoped>
.el-container{
    height: 65vh;
}

.image-aside {
  border-right: 2px solid var(--rose-g2);
}

.image-aside .top {
  bottom: 50px;
}

.image-aside .bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
}
</style>