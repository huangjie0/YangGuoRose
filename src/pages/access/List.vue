<template>
    <el-card shadow="never">
        <ListHeader @refresh="getData" @create="handleCreate"/>
        <el-tree :data="tableData" :props="{ label:'name',children:'child' }" v-loading="loading" :default-expanded-keys="defaultKeys" node-key="id">
            <template #default="{ node, data }">
                <div class="rose-f-row custom-tree-node rose-f-1 rose-font-s3">
                    <el-tag size="small" :type="data.menu ? '' : 'info'">
                        {{ data.menu ? "菜单" : "权限" }}
                    </el-tag>
                    <el-icon v-if="data.icon" :size="16" class="icon-ml">
                        <component :is="data.icon"></component>
                    </el-icon>
                    <span> {{ data.name }}</span>
                    <div class="rose-ml-a">
                        <el-switch v-model="data.status" :active-value="1" :inactive-value="0" class="switch-mr"></el-switch>
                        <el-button size="small" @click.stop="handleEdit(data)">修改</el-button>
                        <el-button type="primary" size="small">添加</el-button>
                        <el-button type="danger" size="small">删除</el-button>
                    </div> 
                </div>
            </template>
        </el-tree>
        <FormDrawer ref="formDrawerRef" @submit="handleSubmit">
            <el-form :model="form" label-width="100px" ref="formRef" :rules="rules" :inline="false">
                <el-form-item label="上级菜单" prop="rule_id">
                    <el-cascader v-model="form.rule_id" :options="userRules" :props="{ value:'id', label:'name',children:'child',checkStrictly:true, emitPath:false }" placeholder="请选择上级菜单" />
                </el-form-item>
                <el-form-item label="菜单/规则" prop="menu">
                    <el-radio-group v-model="form.menu">
                        <el-radio :label="1" border>菜单</el-radio>
                        <el-radio :label="0" border>权限</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name" clearable class="nameInput"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标" prop="icon" v-if="form.menu == 1">
                    <!-- <el-input v-model="form.icon" clearable></el-input> -->
                </el-form-item>
                <el-form-item label="前端路由" prop="frontpath" v-if="form.menu == 1 && form.rule_id > 0">
                    <el-input v-model="form.frontpath" clearable></el-input>
                </el-form-item>
                <el-form-item label="后端规则" prop="condition" v-if="form.menu == 0">
                    <el-input v-model="form.condition" clearable></el-input>
                </el-form-item>
                <el-form-item label="请求方式" prop="method" v-if="form.menu == 0">
                    <el-select v-model="form.method" class="m-2" placeholder="请选择请求方式" size="large">
                        <el-option
                        v-for="item in ['GET' , 'POST' , 'PUT' , 'DELETE' ]"
                        :key="item"
                        :label="item"
                        :value="item"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="排序" prop="order">
                    <el-input-number v-model="form.order" :min="0" :max="10000" clearable></el-input-number>
                </el-form-item>
            </el-form>
        </FormDrawer>
    </el-card>
</template>
<script setup>
import { ref } from 'vue'
import ListHeader from '@/components/ListHeader.vue'
import { getRuleList,createRule,updateRule } from '@/api/rules.js'
import { useInitTable,useInitForm } from '@/composables/useCommon.js'
import FormDrawer from '@/components/FormDrawer.vue'

const userRules = ref([])

const defaultKeys = ref([])

let { 
    loading,
    tableData,
    getData
 } = useInitTable({
    getList:getRuleList,
    onGetListSuccess:(res)=>{
        tableData = res.list
        defaultKeys.value = res.list.map( o => o.id)
        userRules.value = res.rules
    }
})

const { formDrawerRef,formRef,form,drawerTitle,rules,handleSubmit,handleCreate,handleEdit } = useInitForm({
  getData,
  update:updateRule,
  create:createRule,
  form:{
    rule_id:0,
    menu:0,
    name:'',
    condition:'',
    method:'GET',
    status:1,
    order:50,
    icon:'',
    frontpath:''
  },
  rules:{
//     title:[{
//         required: true,
//         message: '公告标题不能为空！',
//         trigger: 'blur'
//     }],
//   content:[{
//         required: true,
//         message: '公告内容不能为空！',
//         trigger: 'blur'
//     }]
  }
})

</script>
<style lang="less">

.nameInput{ 
    width:30%;
}

.custom-tree-node{
    align-items: center;
    padding-right: 8px;
    .icon-ml{
        margin-left:10px;
    }
    .switch-mr{
        margin-right:10px;
    }
}

.el-tree-node__content{
    padding:20px 0;
}

</style>