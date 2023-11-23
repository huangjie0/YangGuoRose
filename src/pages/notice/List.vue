<template>
  <el-card shadow="always">
    <!-- 新增功能 -->
    <div class="rose-f-row rose-f1">
      <el-button type="primary" size="small">新增</el-button>
      <el-tooltip content="刷新" placement="top">
        <el-button text>
          <el-icon :size="20"><Refresh /></el-icon>
        </el-button>
      </el-tooltip>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="title" label="公告标题" width="380" />
      <el-table-column prop="create_time" label="发布时间" width="380" />
      <el-table-column label="操作" with="380" align="center">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        <el-popconfirm title="是否要删除改公告？" confirm-button-text="确认" cancel-button-text="取消" @confirm="handleDelete(scope.row.id)">
            <template #reference>
                <el-button size="small" type="danger" >删除</el-button>
            </template>
        </el-popconfirm>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script setup>
import { ref } from "vue";

const tableData = ref([
  {
    id: 13,
    title: "nip",
    content: "nip\n",
    order: 0,
    create_time: "2022-06-06 14:40:11",
    update_time: "2022-06-06 14:40:11",
  },
]);

const handleDelete = (id)=>{
  console.log(id);
}

</script>
<style lang="less"></style>
