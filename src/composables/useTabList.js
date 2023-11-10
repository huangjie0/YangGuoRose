import { ref } from "vue";
import { useRoute, onBeforeRouteUpdate, useRouter } from "vue-router";
import { useCookies } from "@vueuse/integrations/useCookies";

export function useTabList() {
  const route = useRoute();
  const router = useRouter();
  const activeTab = ref(route.path);
  const cookie = useCookies();

  const tabList = ref([
    {
      title: "后台首页",
      path: "/",
    },
  ]);

  const removeTab = (targetName) => {
    let tabs = tabList.value;
    let a = activeTab.value;
    if (a == targetName) {
      tabs.forEach((tab, index) => {
        if (tab.path == targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            a = nextTab.path;
          }
        }
      });
    }
    activeTab.value = a;
    tabList.value = tabList.value.filter((tab) => tab.path !== targetName);

    cookie.set("tabList", tabList.value);
  };

  const changTab = (t) => {
    activeTab.value = t;
    router.push(t);
  };

  const handleClose = (c) => {
    if (c == "clearAll") {
      // 切换首页
      activeTab.value = "/";
      tabList.value = [
        {
          title: "后台首页",
          path: "/",
        },
      ];
    } else if (c == "clearOther") {
      tabList.value = tabList.value.filter(
        (tab) => tab.path == "/" || tab.path == activeTab.value
      );
    }
    cookie.set("tabList", tabList.value);
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
    let noTab = tabList.value.findIndex((t) => t.path == tab.path) == -1;
    if (noTab) {
      tabList.value.push(tab);
      cookie.set("tabList", tabList.value);
    }
  };

  //初始化标签导航列表
  const initTabList = () => {
    let tabs = cookie.get("tabList");
    if (tabs) {
      tabList.value = tabs;
    }
  };

  initTabList();
  return {
    activeTab,
    tabList,
    changTab,
    removeTab,
    handleClose
  }
}
