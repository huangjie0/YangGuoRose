<template>
    <el-row :gutter="20" class="navs">
        <el-col :span="3" v-for="(item,index) in navsList" :key="item.title">
            <el-card shadow="always" @click="$router.push(item.path)">
                <div class="rose-f-column rose-f-c rose-cursor">
                    <el-icon size="20" :style="{ color:item.color }">
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span class="rose-font-s3 navs-icon">{{ item.title  }}</span>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
<script setup>

const navsList = [
    {
        icon:'StarFilled',
        color:'#a4e2c6',
        title:'用户',
        path:'/user/list'
    },
    {
        icon:'HelpFilled',
        color:'#44cef6',
        title:'商品',
        path:'/goods/list'
    },
    {
        icon:'Promotion',
        color:'#b0a4e3',
        title:'订单',
        path:'/order/list'
    },
    {
        icon:'IceTea',
        color:'#fff143',
        title:'评价',
        path:'/comment/list'
    },
    {
        icon:'ColdDrink',
        color:'#b35c44',
        title:'图库',
        path:'/image/list'
    },
    {
        icon:'CoffeeCup',
        color:'#801dea',
        title:'公告',
        path:'/notice/list'
    },
    {
        icon:'IceCreamRound',
        color:'#00bc12',
        title:'配置',
        path:'/setting/list'
    },
    {
        icon:'Fries',
        color:'#ffb3a7',
        title:'优惠券',
        path:'/coupon/list'
    }
]
</script>
<style lang="less">
.navs{
    margin-top: 30px;
    &-icon{
        margin-top:var(--common-split2);
    }
} 
</style>