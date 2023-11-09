<template>
    {{ d.num }}
</template>
<script setup>
import { reactive } from 'vue'
import gsap from 'gsap'

defineProps({
    value:
})

const d = reactive({
    num:0
}) 


</script>
<style lang="less">
    

</style>