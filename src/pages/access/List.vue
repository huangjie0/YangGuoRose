<template>
    <el-card shadow="never">
        <ListHeader @refresh="getData"/>
        <el-tree :data="tableData" :props="{ label:'name',children:'child' }" v-loading="loading" :default-expanded-keys="defaultKeys" node-key="id">
            <template #default="{ node, data }">
                <span class="custom-tree-node">
                <span>{{ node.label }}</span>
                <span>
                    <a @click="append(data)"> Append </a>
                    <a style="margin-left: 8px" @click="remove(node, data)"> Delete </a>
                </span>
                </span>
            </template>
        </el-tree>
    </el-card>
</template>
<script setup>
import { ref } from 'vue'
import ListHeader from '@/components/ListHeader.vue'
import { getRuleList } from '@/api/rules.js'
import { useInitTable } from '@/composables/useCommon.js'

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
    }
})

</script>
<style lang="less">
    
</style>