<template>
    <el-tag
        v-for="tag in dynamicTags"
        :key="tag"
        class="rose-mr-1"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
    >
        {{ tag }}
    </el-tag>
    <el-input
        v-if="inputVisible"
        ref="InputRef"
        v-model="inputValue"
        class="tag-input"
        size="small"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm" 
    />
    <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
        添加值
    </el-button>
</template>

<script setup>
import { nextTick, ref } from 'vue';

const inputValue = ref('')
const dynamicTags = ref(props.modelValue ? props.modelValue.split(',') : [])
const inputVisible = ref(false)
const InputRef = ref()

const props = defineProps({
    modelValue:String
})

const emits = defineEmits(["update:modelValue"])

const handleClose = (tag) => {
    dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
    emits("update:modelValue",dynamicTags.value.join(','))
}

const showInput = () => {
inputVisible.value = true
nextTick(() => {
    InputRef.value.input.focus()
})
}

const handleInputConfirm = () => {
    if (inputValue.value) {
        dynamicTags.value.push(inputValue.value)
        emits("update:modelValue",dynamicTags.value.join(','))
    }
    inputVisible.value = false
    inputValue.value = ''
}

</script>
<style lang="less" scoped>
.tag-input{
    width:180px;
}

</style>