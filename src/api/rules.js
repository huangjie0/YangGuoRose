import axios from "@/axios.js";

export function getRuleList(page){
    return axios.get(`/admin/rule/${page}`)
}
