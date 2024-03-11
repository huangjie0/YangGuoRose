import { ref } from 'vue';

//商品id
export const goods_id = ref(0)

//规格选项列表
export const sku_card_list = ref([])

//初始化列表
export function initSkuCardList(d){
    console.log(d);
}
