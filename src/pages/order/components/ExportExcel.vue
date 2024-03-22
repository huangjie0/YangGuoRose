<template>
    <FormDrawer ref="formDrawerRef" title="导出订单" destroy-on-close confirmText="导出" @submit="submit">
        <el-form :model="form" label-width="80px">
            <el-form-item label="订单类别"> 
                <el-select v-model="form.tab" placeholder="选择订单类别">
                    <el-option
                        v-for="item in props.tabs"
                        :key="item.key"
                        :label="item.name"
                        :value="item.key"
                        />
                </el-select>
            </el-form-item>
            <el-form-item label="时间范围"> 
                <el-date-picker
                    v-model="form.time"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="YYYY-MM-DD"
                    >
                </el-date-picker>
            </el-form-item>
        </el-form>
    </FormDrawer>
</template>
<script setup>
import { ref, reactive } from 'vue';
import FormDrawer from '@/components/FormDrawer.vue';
import { exportOrder } from '@/api/order.js';
import { toast } from '@/composables/util.js'

const formDrawerRef = ref(null)
const form = reactive({
    tab:null,
    time:""
})

defineExpose({
    formDrawerRef
})

const props = defineProps({
    tabs:Array
})

const submit = ()=>{
    if(!form.tab) return toast("订单类别不能为空！",'error')
    formDrawerRef.value.showLoading()
    let starttime = null
    let endtime = null
    if(form.time && Array.isArray(form.time)){
        starttime = form.time[0]
        endtime = form.time[1]
    }
    exportOrder({
        tab:form.tab,
        starttime,
        endtime
    }).then(res=>{
        let url = window.URL.createObjectURL(new Blob([res]))
        let link = document.createElement('a') 
        link.style.display = "none"
        link.href = url
        let filename = (new Date()).getTime() + ".xlsx"
        link.setAttribute("download",filename)
        document.body.appendChild(link)
        link.click()
        formDrawerRef.value.close()
    }).finally(()=>{
        formDrawerRef.value.hideLoading()
    })
}

</script>
<style lang="less">
</style>