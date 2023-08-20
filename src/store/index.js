import {createStore} from 'vuex'
import { login, getInfo } from '@/api/manager.js'
import {setToken} from '@/composables/auth.js'

// 创建一个新的 store 实例
const store = createStore({
    state () {
      return {
        // 用户信息
        user:{}
      }
    },
    mutations: {
        SET_USERINFO(state,user){
            state.user = user
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
        }
    }
  })
 
  export default store
