import axios from "@/axios.js";

export function getAgentStatistics(){
    return axios.get('/admin/agent/statistics')
}