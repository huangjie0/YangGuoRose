import store from '@/store';

export default {
    install(app){
        app.directive("permission",{
            mounted(el,bindding) {
                hasPermission(bindding.value)
            },
        })
    }
}

function hasPermission(value,el=false) {
    if(!Array.isArray(value)){
        throw new Error('需要正确配置权限！')
    }
    const hasAuth = value.findIndex(v=>store.state.ruleNames.includes(v)) !== -1
    if(el && !hasAuth){
        el.parentNode && parentNode.removeChild(el)
    }
    return hasAuth
}