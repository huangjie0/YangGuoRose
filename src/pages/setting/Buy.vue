<template>
    <div v-loading="loading" class="rose-bg-w rose-br-s1">
        <el-form :model="form" label-width="160px">
            <el-tabs v-model="activeName">
                <el-tab-pane label="支付设置" name="first">
                    <el-table :data="tableData" border stripe>
                        <el-table-column label="支付方式" align="left" >
                            <template #default="{ row }">
                                <div class="rose-f-row">
                                    <el-image :src="row.src" fit="fill" class="smallImage rose-br-s1 rose-mr-1" :lazy="true"></el-image>
                                    <div>
                                        <h6>{{ row.name }}</h6>
                                        <small>{{ row.desc }}</small>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="">
                            <template #default="{row}">
                                <el-button  size="small" type="primary">配置</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="购物设置" name="second">
                    <!-- <el-form-item label="默认上传方式">
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
                    </el-form-item> -->
                    <el-form-item>
                        <el-button type="primary" @click="submit">保存</el-button>
                    </el-form-item>
                </el-tab-pane>
            </el-tabs>
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
const tableData = [
    {
        name:'支付宝支付',
        desc:"该系统支持即时到账接口",
        src:"/zhifubao.jpg",
        key:"alipay"
    },
    {
        name:'微信支付',
        desc:"该系统支持微信网页支付和扫码支付",
        src:"/weixin.jpg",
        key:"wxpay"
    }
]

const form = reactive({
    "close_order_minute": 30,
    "auto_received_day": 7,
    "after_sale_day": 23,
    "alipay": {
        "app_id": "...",
        "ali_public_key": "...",
        "private_key": "..."
    },
    "wxpay": {
        "app_id": "...",
        "miniapp_id": "...",
        "secret": "...",
        "appid": "...",
        "mch_id": "...",
        "key": "...",
        "cert_client": "....pem",
        "cert_key": "....pem"
    },
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
.smallImage{
  width:50px;
  height:50px;
}
</style>