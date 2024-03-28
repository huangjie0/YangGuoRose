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
                                <el-button  size="small" type="primary" @click="disposition(row)">配置</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="购物设置" name="second">
                    <el-form-item label="未支付订单">
                        <el-input v-model="form.close_order_minute" style="width: 300px;" placeholder="未支付订单" type="number">
                            <template #append>
                                分钟后自动关闭
                            </template>
                        </el-input>
                        <small class="rose-ml-1 rose-bg2">订单下单未付款，n分钟后自动关闭，设置0不自动关闭</small>
                    </el-form-item>
                    <el-form-item label="已发货订单">
                        <el-input v-model="form.auto_received_day" style="width: 300px;" placeholder="已发货订单" type="number">
                            <template #append>
                                天后自动确定收货
                            </template>
                        </el-input>
                        <small class="rose-ml-1 rose-bg2">如果在期间未确认收货，系统自动完成收货，设置0不自动收货</small>
                    </el-form-item>
                    <el-form-item label="已完成订单">
                        <el-input v-model="form.after_sale_day" style="width: 300px;" placeholder="已完成订单" type="number">
                            <template #append>
                               天内允许申请售后
                            </template>
                        </el-input>
                        <small class="rose-ml-1 rose-bg2">订单完成后，用户在n天内可以发起售后申请，设置0不允许申请售后</small>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit">保存</el-button>
                    </el-form-item>
                </el-tab-pane>
            </el-tabs>
        </el-form>

        <FormDrawer title="配置" ref="formDrawerRef" @submit="submit">
            <el-form :model="form" label-width="120" v-if="drawerType == 'alipay'">
                <el-form-item label="app_id">
                    <el-input v-model="form.alipay.app_id" placeholder="app_id" type="textarea" rows="4"></el-input>
                </el-form-item>
                <el-form-item label="ali_public_key">
                    <el-input v-model="form.alipay.ali_public_key" placeholder="ali_public_key" type="textarea" rows="4"></el-input>
                </el-form-item>
                <el-form-item label="private_key">
                    <el-input v-model="form.alipay.private_key" placeholder="private_key" type="textarea" rows="4"></el-input>
                </el-form-item>
            </el-form>
            <el-form :model="form" label-width="120" v-else>
                <el-form-item label="公众号 app_id">
                    <el-input v-model="form.wxpay.app_id" placeholder="app_id" type="textarea" rows="4"></el-input>
                </el-form-item>
                <el-form-item label="小程序 app_id">
                    <el-input v-model="form.wxpay.miniapp_id" placeholder="miniapp_id" type="textarea" rows="4"></el-input>
                </el-form-item>
                <el-form-item label="小程序 secret">
                    <el-input v-model="form.wxpay.secret" placeholder="secret" type="textarea" rows="4"></el-input>
                </el-form-item>
                <el-form-item label="appid">
                    <el-input v-model="form.wxpay.appid" placeholder="appid" type="textarea" rows="4"></el-input>
                </el-form-item>
                <el-form-item label="商户号">
                    <el-input v-model="form.wxpay.mch_id" placeholder="mch_id" type="textarea" rows="4"></el-input>
                </el-form-item>
                <el-form-item label="api密钥">
                    <el-input v-model="form.wxpay.key" placeholder="key" type="textarea" rows="4"></el-input>
                </el-form-item>
                <el-form-item label="cert_client">
                    <el-upload
                    :action="uploadAction"
                    :headers="{ token }"
                    :limit="1"
                    accept=".pem"
                    :on-success="uploadClientSuccess"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <template #tip>
                            <p class="rose-font-red">
                                {{ form.wxpay.cert_client ? form.wxpay.cert_client : "还未配置"}}
                            </p>
                            <div class="el-upload__tip">例如：apiclient_cert.pem </div>
                        </template>
                    </el-upload>
                </el-form-item>
                <el-form-item label="cert_key">
                    <el-upload
                    :action="uploadAction"
                    :headers="{ token }"
                    :limit="1"
                    accept=".pem"
                    :on-success="uploadKeySuccess"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <template #tip>
                            <p class="rose-font-red">
                                {{ form.wxpay.cert_key ? form.wxpay.cert_key : "还未配置"}}
                            </p>
                            <div class="el-upload__tip">例如：apiclient_key.pem </div>
                        </template>
                    </el-upload>
                </el-form-item>
            </el-form>
        </FormDrawer>
    </div>
</template>
<script setup>
import { toast } from '@/composables/util.js';
import { ref, reactive } from 'vue';
import { getSysconfig,setSysconfig, uploadAction} from '@/api/sysconfig.js';
import FormDrawer from '@/components/FormDrawer.vue';
import { getToken } from "@/composables/auth.js";

const loading = ref(false);
const formDrawerRef = ref(null);
const drawerType = ref("alipay");
const token = getToken();

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

const disposition = (row)=>{
    drawerType.value = row.key
    formDrawerRef.value.open()
}

const uploadClientSuccess = (response, file, fileList)=>{
    form.wxpay.cert_client = response.data
}

const uploadKeySuccess = (response, file, fileList)=>{
    form.wxpay.cert_key = response.data
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
    close_order_minute: 30,
    auto_received_day: 7,
    after_sale_day: 23,
    alipay: {
        app_id: "...",
        ali_public_key: "...",
        private_key: "..."
    },
    wxpay: {
        app_id: "...",
        miniapp_id: "...",
        secret: "...",
        appid: "...",
        mch_id: "...",
        key: "...",
        cert_client: "....pem",
        cert_key: "....pem"
    }
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