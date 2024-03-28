<template>
    <div v-loading="loading" class="rose-bg-w rose-br-s1">
        <el-form :model="form" label-width="160px">
            <el-form-item label="物流查询key">
                <el-input v-model="form.ship" style="width: 300px;" placeholder="物流查询key"></el-input>
                <small class="rose-ml-1 rose-bg2">用于查询物流信息，接口申请（仅供参考）</small>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { toast } from '@/composables/util.js';
import { ref, reactive } from 'vue';
import { getSysconfig,setSysconfig} from '@/api/sysconfig.js';

const loading = ref(false);

const getData = ()=>{
    loading.value = true
    getSysconfig().then(res=>{
        for (const k in form) {
            form[k] = res[k]
        }
    }).finally(()=>{
        loading.value = false
    })
}

const form = reactive({
    ship:""
})

const submit = ()=>{
    loading.value = true;
    setSysconfig(form).then(res=>{
        toast("修改成功！")
        getData()
    }).finally(()=>{
        loading.value = false;
    })
}

getData()

</script>
<style lang="less">
</style>