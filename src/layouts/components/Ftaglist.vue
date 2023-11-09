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
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <div class="fill"></div>
</template>
<script setup>
import { ref } from "vue";
import { useRoute, onBeforeRouteUpdate, useRouter} from "vue-router";
import { onMounted , onBeforeMount } from 'vue';
import { useCookies } from '@vueuse/integrations/useCookies'

const route = useRoute();
const router = useRouter();
const activeTab = ref(route.path);
const cookie = useCookies();

const tabList = ref([
  {
    title: "后台首页",
    path: "/",
  },
  {
    title: "商城管理",
    path: "/goods/list",
  },
]);

const removeTab = (targetName) => {};

const changTab = (t) => {
  activeTab.value = t;
  router.push(t);
};

onBeforeRouteUpdate((to, from) => {
  activeTab.value = to.path;
  addTab({
    title: to.meta.title,
    path: to.path,
  });
});

//添加标签导航的方法
const addTab = (tab) => {
  let noTab = tabList.value.findIndex(t => t.path == tab.path) == -1;
  if (noTab) {
    tabList.value.push(tab);
    cookie.set("tabList", tabList.value);
  }
};

//初始化标签导航列表
const initTabList = () => {
  let tabs = cookie.get("tabList")
  if(tabs){
    tabList.value = tabs
  }
}

initTabList()

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
