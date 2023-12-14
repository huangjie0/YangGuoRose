import { ref , reactive } from 'vue';

export function useInitTable(opt = {}){
    const searchForm = null;
    const reset = null;
    if(opt.searchForm){
        searchForm = reactive({ ...opt.searchForm })
        reset = () => {
            for (const key in opt.searchForm) {
                searchForm[key] = opt.searchForm[key]
            }
            getData()
        }
    }
    const tableData = ref([]);
    const loading = ref(false);
    const total = ref(0);
    const limit = ref(10);
    const currentPage = ref(1);

    const getData = (page = null) => {
    if (typeof page == "number") {
        currentPage.value = page;
    }
    
    loading.value = true;
        opt.getList(currentPage.value,searchForm)
        .then((res) => {
        if(opt.onGetListSuccess && typeof opt.onGetListSuccess == "function"){
            opt.onGetListSuccess(res)
        }else{
            total.value = res.totalCount
            tableData.value = res.list
        }
        })
        .finally(() => {
            loading.value = false;
        });
    }

    return {
        searchForm,
        reset,
        tableData,
        loading,
        currentPage,
        total,
        limit,
        getData
    }
}