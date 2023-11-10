<template>
  <div class="f-menu" :style="{ width:$store.state.asideWidth }">
    <el-scrollbar>
      <el-menu active-text-color="#a781ee" :default-active="defaultActive" :unique-opened="true" default-active="2" @select="handleSelect" :collapse="isCollapse" :collapse-transition="false">
        <template v-for="(item,index) in asideMenus" :key="index">
          <el-sub-menu :index="item.name" v-if="item.child && item.child.length > 0">
            <template #title>
              <el-icon><component :is="item.icon"></component></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item v-for="(item2,index2) in item.child" :key="index2" :index="item2.frontpath">
              <el-icon><component :is="item2.icon"></component></el-icon>
              <span>{{ item2.name }}</span>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else :index="item.frontpath">
            <el-icon><component :is="item.icon"></component></el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script setup>
import { useRouter,useRoute , onBeforeRouteUpdate } from 'vue-router';
import { computed , ref } from 'vue';
import { useStore } from 'vuex'; 

const router = useRouter()
const route = useRoute()
const store = useStore()

//默认激活状态下的路由路劲
const defaultActive = ref(route.path)  

const isCollapse = computed(()=> !(store.state.asideWidth == '250px'))

const asideMenus = computed(()=> store.state.menus)

const handleSelect = (e)=>{
  router.push(e)
};

onBeforeRouteUpdate((to, from) => {
  defaultActive.value = to.path;
});

</script>

<style lang="less" scoped>

.f-menu {
  transition:all 0.2s;
  overflow-x:hidden;
  overflow-y:auto;
  top: 64px;
  bottom: 0;
  left: 0;
  position: fixed;
  background: var(--rose-g2);
}

</style>
