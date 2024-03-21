import axios from "@/axios.js";
import { queryParams } from '@/composables/util.js';

export function getGoodsCommentList(page,query = {}){
    let r = queryParams(query)
    return axios.get(`/admin/goods_comment/${page}${r}`)
}

export function updateGoodsCommentStatus(id,status){
    return axios.post(`/admin/goods_comment/${id}/update_status`,{
        status
    })
}

export function  reviewGoodsComment(id,data){
    return axios.post(`/admin/goods_comment/review/${id}`,{
        data
    })
}