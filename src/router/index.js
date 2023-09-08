import { createRouter,createWebHashHistory} from 'vue-router'
import Index from '@/pages/index.vue'
import NotFound from '@/pages/404.vue'
import Login from '@/pages/login.vue'
import Admin from '@/layouts/admin.vue'
const routes = [
    {
        path:'/',
        component:Admin,
        children:[
            {
                path:'/',
                component:Index,
                meta:{
                    title:'后台首页'
                }
            }
        ]
    },
    {
        path:'/:pathMatch(.*)*',
        component:NotFound,
        name:'NotFound'
    },
    {
        path:'/login',
        component:Login
    }
]
const router = createRouter({
    history:createWebHashHistory(),
    routes
})
export default router