import { createRouter, createWebHashHistory } from "vue-router";
import Index from "@/pages/index.vue";
import NotFound from "@/pages/404.vue";
import Login from "@/pages/login.vue";
import Admin from "@/layouts/admin.vue";
import GoodsList from "@/pages/goods/List.vue";
import CategoryList from "@/pages/category/List.vue";

//默认路由所有页面共享
const routes = [
  {
    path: "/",
    component: Admin,
    name: "admin"
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
    name: "NotFound",
  },
  {
    path: "/login",
    component: Login,
    meta: {
      title: "登录页", 
    },
  },
];

//动态路由，用于匹配菜单动态添加
const asyncRoutes = [
  {
    path: "/",
    name:"/",
    component: Index,
    meta: {
      title: "后台首页",
    },
  },
  {
    path: "/goods/list",
    name: "/goods/list",
    component: GoodsList,
    meta: {
      title: "商品管理",
    },
  },
  {
    path: "/category/list",
    name: "/category/list",
    component: CategoryList,
    meta: {
      title: "分类列表",
    },
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

//动态添加路由方法
export function addRoutes(menus){
  //是否有新的路由
  let hasNewRoutes = false

    const findAnddRoutesByMenus = (arr) => {
        arr.forEach(e=>{
            let item = asyncRoutes.find(o => o.path == e.frontpath)
            if(item && !router.hasRoute(item.path)){
                router.addRoute("admin",item)
                hasNewRoutes = true
            }
            if(e.child && e.child.length > 0){
                findAnddRoutesByMenus(e.child)
            }
        })
    }
    findAnddRoutesByMenus(menus);
    return hasNewRoutes
}


