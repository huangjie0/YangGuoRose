import axios from "@/axios.js";

import { queryParams } from '@/composables/util.js'

export function getAgentList(page,query = {}){
    let r = queryParams(query)
    return axios.get(`/admin/agent/${page}${r}`)
}

export function getAgentOrderList(page,query = {}){
    let r = queryParams(query)
    return axios.get(`/admin/user_bill/${page}${r}`)
}

export function getAgentStatistics(){
    return axios.get('/admin/agent/statistics')
}