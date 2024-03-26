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
                            <el-checkbox label="0" border>数字</el-checkbox>
                            <el-checkbox label="1" border>小写字母</el-checkbox>
                            <el-checkbox label="2" border>大写字母</el-checkbox>
                            <el-checkbox label="3" border>符号</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="上传设置" name="second">
                    <el-form-item label="默认上传方式">
                        <el-radio-group v-model="form.upload_method">
                            <el-radio label="oss" border>对象存储</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="Bucket">
                        <el-input v-model="form.upload_config.Bucket" style="width: 300px;" placeholder="Bucket"></el-input>
                    </el-form-item>
                    <el-form-item label="ACCESS_KEY">
                        <el-input v-model="form.upload_config.ACCESS_KEY" style="width: 300px;" placeholder="ACCESS_KEY"></el-input>
                    </el-form-item>
                    <el-form-item label="SECRET_KEY">
                        <el-input v-model="form.upload_config.SECRET_KEY" style="width: 300px;" placeholder="SECRET_KEY"></el-input>
                    </el-form-item>
                    <el-form-item label="空间域名">
                        <el-input v-model="form.upload_config.http" style="width: 300px;" placeholder="请输入空间域名"></el-input>
                        <small class="rose-ml-1 rose-bg2">请补全http：//或https</small>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="Api安全" name="third">
                    <el-form-item label="是否开启Api安全">
                        <el-radio-group v-model="form.api_safe">
                            <el-radio :label="0" border>关闭</el-radio>
                            <el-radio :label="1" border>开启</el-radio>
                        </el-radio-group>
                        <small class="rose-ml-1 rose-bg2">api安全功能开启之后调用前端api需要传输签名串</small>
                    </el-form-item>
                    <el-form-item label="秘钥">
                        <el-input v-model="form.api_secret" style="width: 300px;" placeholder="请输入秘钥"></el-input>
                        <small class="rose-ml-1 rose-bg2">秘钥设置关系系统中api调用传输签名串的编码规则，以及会员token解析，
                            注意设置之后对应会员要求重新登录获取token
                        </small>
                    </el-form-item>
                </el-tab-pane>
            </el-tabs>
            <el-form-item>
                <el-button type="primary" @click="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { toast } from '@/composables/util.js';
import { ref, reactive } from 'vue';
import { getSysconfig,setSysconfig } from '@/api/sysconfig.js';

const loading = ref(false);
const getData = ()=>{
    loading.value = true
    getSysconfig().then(res=>{
        for (const k in form) {
            form[k] = res[k]
        }
        form.password_encrypt = res.password_encrypt.split(',')
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
        ACCESS_KEY: "",
        SECRET_KEY: ""
    },
    api_safe: 1,
    api_secret: "",

})

const submit = ()=>{
    loading.value = true;
    form.password_encrypt = form.password_encrypt.join(',')
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