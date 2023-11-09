<template>
    {{ d.num.toFixed(0) }}
</template>
<script setup>
import { reactive , onMounted , watch } from 'vue'
import gsap from 'gsap'

const props = defineProps({
    value:{
        type:Number,
        default:0
    }
})

const d = reactive({
    num:0
}) 

const animateToValue = () => {
    gsap.to(d,{
        duration:0.5,
        num:props.value
    })
}

onMounted(()=>{
    animateToValue()
})

watch(()=> props.value,()=>{
    animateToValue()
})

</script>
<style lang="less"></style>