import {createStore} from 'vuex'
import { login, getInfo } from '@/api/manager.js'
import {setToken,clearnToken} from '@/composables/auth.js'

// 创建一个新的 store 实例
const store = createStore({
    state () {
      return {
        // 用户信息
        user:{},
        //侧边宽度
        asideWidth:"250px"
      }
    },
    mutations: {
        //记录用户信息
        SET_USERINFO(state,user){
            state.user = user
        },
        //控制展开和收起
        HANDLE_ASIDE_WIDTH(state){
            state.asideWidth = state.asideWidth == "250px" ? "64px" : "250px"
        }
    },
    actions:{
        login({commit},{userName,passWord}){
            return new Promise((resolve,reject)=>{
                login(userName,passWord).then((res)=>{
                    //存储用户token
                    setToken(res.token)
                    resolve(res)
                }).catch((error)=>{
                    reject(error)
                })
            })
        },
        //获取用户信息
        getinfo({ commit }){
            return new Promise(( resolve ,reject)=>{
                getInfo().then((res)=>{
                    commit('SET_USERINFO',res)
                    resolve(res)
                }).catch(error=>reject(error))

            }) 
        },
        //退出登录
        logout({commit}){
            //移除token
            clearnToken()
            //清除当前用户状态
            commit("SET_USERINFO",{})
        }
    }
  })
 
  export default store
