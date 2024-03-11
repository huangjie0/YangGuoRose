<template>
    <el-form-item label="规格选项">
      <el-card class="specification-card" v-for="(item,index) in sku_card_list" :key="item.id">
        <template #header>
            <div class="rose-f-row specification-options">
                <el-input v-model="item.text" style="width: 200px" placeholder="规格名称">
                    <template #append>
                        <el-icon><more/></el-icon>
                    </template>
                </el-input>
                <el-button size="small" class="rose-ml-a">
                    <el-icon><Top /></el-icon>
                </el-button>
                <el-button size="small">
                    <el-icon><Bottom /></el-icon>
                </el-button>
                <el-button size="small">
                    <el-icon><Delete /></el-icon>
                </el-button>
            </div>
        </template>
        <SkuCardItem :sku-card-id="item.id"></SkuCardItem>
      </el-card>
      <el-button type="success" size="small" :loading="btnLoading" @click="addSkuCardEvent">添加规格</el-button>
    </el-form-item>
</template>
<script setup>
import SkuCardItem from './SkuCardItem.vue';
import { sku_card_list, addSkuCardEvent , btnLoading } from '@/composables/useSku.js';

</script>
<style lang="less">
.specification-card{
    width: 100%;
    &-options{
        align-items: center;
    }
}
.el-card__header{
    background-color: var(--rose-g3);
}
</style>