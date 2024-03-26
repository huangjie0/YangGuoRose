import { createRouter, createWebHashHistory } from "vue-router";
import Index from "@/pages/index.vue";
import NotFound from "@/pages/404.vue";
import Login from "@/pages/login.vue";
import Admin from "@/layouts/admin.vue";
import GoodsList from "@/pages/goods/List.vue";
import CategoryList from "@/pages/category/List.vue";
import UserList from "@/pages/user/List.vue";
import OrderList from "@/pages/order/List.vue";
import CommentList from "@/pages/comment/List.vue";
import ImageList from "@/pages/image/List.vue";
import NoticeList from "@/pages/notice/List.vue";
import CouponList from "@/pages/coupon/List.vue";
import SettingList from "@/pages/setting/List.vue";
import ManagerList from "@/pages/manager/List.vue";
import AccessList from "@/pages/access/List.vue";
import RoleList from "@/pages/role/List.vue";
import SkusList from '@/pages/skus/List.vue';
import LevelList from '@/pages/level/List.vue';

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
  {
    path: "/user/list",
    name: "/user/list",
    component: UserList,
    meta: {
      title: "用户列表",
    },
  },
  {
    path: "/order/list",
    name: "/order/list",
    component: OrderList,
    meta: {
      title: "订单列表",
    },
  },
  {
    path: "/comment/list",
    name: "/comment/list",
    component: CommentList,
    meta: {
      title: "评论列表",
    },
  },
  {
    path: "/image/list",
    name: "/image/list",
    component: ImageList,
    meta: {
      title: "图片列表",
    },
  },
  {
    path: "/notice/list",
    name: "/notice/list",
    component: NoticeList,
    meta: {
      title: "公告列表",
    },
  },
  {
    path: "/coupon/list",
    name: "/coupon/list",
    component: CouponList,
    meta: {
      title: "优惠券列表",
    },
  },
  {
    path: "/setting/base",
    name: "/setting/base",
    component: SettingList,
    meta: {
      title: "配置列表",
    },
  },
  {
    path: "/manager/list",
    name: "/manager/list",
    component: ManagerList,
    meta: {
      title: "管理员列表",
    },
  },
  {
    path: "/access/list",
    name: "/access/list",
    component: AccessList,
    meta: {
      title: "菜单权限管理"
    },
  },
  {
    path: "/role/list",
    name: "/role/list",
    component: RoleList,
    meta: {
      title: "角色管理"
    },
  },
  {
    path: "/skus/list",
    name: "/skus/list",
    component: SkusList,
    meta: {
      title: "规格管理"
    },
  },
  {
    path: "/level/list",
    name: "/level/list",
    component: LevelList,
    meta: {
      title: "会员等级"
    },
  }
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


