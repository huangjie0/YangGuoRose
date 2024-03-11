import { ElNotification,ElMessageBox } from "element-plus";
import nProgress from "nprogress";
//消息提示
export function toast(message,type='success',dangerouslyUseHTMLString=true){
    ElNotification({
        message,
        type,
        duration: 3000,
        dangerouslyUseHTMLString
      });
}

export function showModal(content = '提示内容',type='warning',title=''){
  return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type,
    }
  )
}

//显示loading
export function showFullLoading(){
    nProgress.start()
}
//隐藏loading
export function hideFullLoading(){
  nProgress.done()
}
//弹出输入框
export function showPrompt(tip,value=''){
  return ElMessageBox.prompt( tip ,'', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue: value
  })
}

//将query对象转成url参数
export function queryParams(query){
  let q = []
  for (const key in query) {
     if(query[key]){
      q.push(`${key}=${encodeURIComponent(query[key])}`)
     }
  }
  let r = q.join("&")
  r = r ? "?" + r : "" 
  return r
}

//商品上移
export function useArrayMoveUp(arr,index){
  swapArray(arr,index,index-1)
}

//商品下移
export function useArrayMoveDown(arr,index){
  swapArray(arr,index,index+1)
}

function swapArray(arr,index1,index2){
  arr[index1] = arr.splice(index2,1,arr[index1])[0]
  return arr
}