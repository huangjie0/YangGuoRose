<template>
    <CommonDialog title="商品选择" width="80%" ref="commonDialogRef">
        <template #content>
            111
        </template>
    </CommonDialog>
</template>
<script setup>
import { ref } from "vue";
import CommonDialog from './CommonDialog.vue';

const commonDialogRef = ref(null)


defineExpose({
    commonDialogRef
})

</script>
<style lang="less">

</style>