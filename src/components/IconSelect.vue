<template>
    <div class="rose-f1">
        <el-icon v-if="modelValue" :size="20" class="small-icon">
            <component :is="modelValue"></component>
        </el-icon>
        <el-select filterable :modelValue="modelValue" class="m-2" placeholder="请选择图标" size="large" @change="handleChange">
            <el-option v-for="item in icons" :key="item" :label="item" :value="item">
                <div class="rose-f1">
                    <el-icon>
                        <component :is="item"></component>
                    </el-icon>
                    <span class="rose-bg2">{{ item }}</span>
                </div>
            </el-option>
        </el-select>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import * as iconList from "@element-plus/icons-vue";

const icons = ref(Object.keys(iconList))

defineProps({
    modelValue:String
})

const emits = defineEmits(["update:modelValue"])

const handleChange = (v) => {
    emits("update:modelValue",v)
}

</script>
<style lang="less" scoped>
.small-icon{
    margin-right:5px;
}
</style>