<template>
    <div v-loading="loading" class="rose-bg-w rose-br-s1">
        <el-form :model="form" label-width="160px">
            <el-tabs v-model="activeName">
                <el-tab-pane label="注册与访问" name="first">
                    <el-form-item label="是否注册会员">
                        <el-radio-group v-model="form.open_reg">
                            <el-radio label="0" border>关闭</el-radio>
                            <el-radio label="1" border>开启</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="注册类型">
                        <el-radio-group v-model="form.reg_method">
                            <el-radio label="username" border>普通注册</el-radio>
                            <el-radio label="phone" border>手机注册</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="密码最小长度">
                        <el-input v-model="form.password_min" style="width: 300px;" placeholder="请输入密码最小长度" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="强度密码复杂度">
                        <el-checkbox-group v-model="form.password_encrypt">
                            <el-checkbox :label="0" border>数字</el-checkbox>
                            <el-checkbox :label="1" border>小写字母</el-checkbox>
                            <el-checkbox :label="2" border>大写字母</el-checkbox>
                            <el-checkbox :label="3" border>符号</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="上传设置" name="second">配置管理</el-tab-pane>
                <el-tab-pane label="Api安全" name="third">Api安全</el-tab-pane>
            </el-tabs>
            <el-form-item>
                <el-button type="primary">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import { getSysconfig,setSysconfig } from '@/api/sysconfig.js';

const loading = ref(false);
const getData = ()=>{
    loading.value = true
    getSysconfig().then(res=>{
        console.log(res);
    }).finally(()=>{
        loading.value = false
    })
}

const activeName = ref("first");

const form = reactive({
    open_reg: 1,
    reg_method: "username",
    password_min: 7,
    password_encrypt: [],
    upload_method: "oss",
    upload_config: {
        Bucket: "",
        http: "",
        ACCESS_KEY: "****************",
        SECRET_KEY: "****************"
    },
    api_safe: 1,
    api_secret: "...",

})

getData()
</script>
<style lang="less">
    
</style>