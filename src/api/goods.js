import axios from "@/axios.js";
import { queryParams } from '@/composables/util.js'

export function getGoodsList(page,query = {}){
    // let q = []
    // for (const key in query) {
    //    if(query[key]){
    //     q.push(`${key}=${encodeURIComponent(query[key])}`)
    //    }
    // }
    // let r = q.join("&")
    // r = r ? "?" + r : "" 
    let r = queryParams(query)
    return axios.get(`/admin/goods/${page}${r}`)
}

export function updateGoodsStatus(ids,status){
    return axios.post(`/admin/goods/changestatus`,{
        ids,
        status
    })
}

export function createGoods(data){
    return axios.post(`/admin/goods`,data)
}

export function updateGoods(id,data){
    return axios.post(`/admin/goods/${id}`,data)
}

export function deleteGoods(ids){
    return axios.post(`/admin/goods/delete_all`,{
        ids
    })
}