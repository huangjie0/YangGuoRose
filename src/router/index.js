import { createRouter,createWebHashHistory} from 'vue-router'
import Index from '@/pages/index.vue'
import About from '@/pages/about.vue'
import NotFound from '@/pages/404.vue'
const routes = [
    {
        path:'/',
        component:Index
    },
    {
        path:'/about',
        component:About
    },
    {
        path:'/:pathMatch(.*)*',
        component:NotFound,
        name:'NotFound'
    }
]
const router = createRouter({
    history:createWebHashHistory(),
    routes
})
export default router