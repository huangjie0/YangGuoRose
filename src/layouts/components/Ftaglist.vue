<template>
  <div class="f-tag-list rose-f-row" :style="{ left: $store.state.asideWidth }">
    <el-tabs
      v-model="activeTab"
      type="card"
      class="tabs rose-f-1"
      @tab-remove="removeTab"
      @tab-change="changTab"
    >
      <el-tab-pane
        v-for="item in tabList"
        :key="item.path"
        :label="item.title"
        :name="item.path"
        :closable="item.path != '/'"
      ></el-tab-pane>
    </el-tabs>
    <span class="tag-btn rose-bg-w rose-br-s1 rose-f-c">
      <el-dropdown @command="handleClose">
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
            <el-dropdown-item command="clearAll">全部关闭</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <div class="fill"></div>
</template>
<script setup>
import { useTabList } from '@/composables/useTabList.js';

const { activeTab,tabList,changTab,removeTab,handleClose } =  useTabList()
</script>

<style lang="less" scoped>
.f-tag-list {
  position: fixed;
  top: 64px;
  right: 0;
  height: 44px;
  background: var(--rose-g3);
  align-items: center;
  z-index: 100;
  .tabs {
    min-width: 100px;
  }
  .tag-btn {
    height: 32px;
    width: 32px;
    margin-left: auto;
    margin-right: 10px;
  }
}
.fill {
  height: 44px;
}
</style>
