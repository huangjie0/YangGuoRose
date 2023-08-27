import router from '@/router'
import {getToken} from '@/composables/auth.js'
import {toast} from '@/composables/util.js'
import store from './store'
import {showFullLoading,hideFullLoading} from '@/composables/util'
//全局前置守卫
router.beforeEach(async (to, from, next) => {
    //显示loading
    showFullLoading()
    const token = getToken()
    //没有登录强制跳转登录页
    if(!token && to.path != '/login'){
        toast('请先登录','error')
        next({path:'/login'})
    }

    //防止重复登录
    if(token && to.path == '/login'){
        toast('请勿重复登录！','error')
        next({path:from.path ? from.path : '/'})
    }
    //如果用户登录了，自动获取用户信息，并存储在vuex中
    if(token){
        await store.dispatch('getinfo')
    }
    next()
})

//全局后置钩子
router.afterEach(() => {
    hideFullLoading()
})