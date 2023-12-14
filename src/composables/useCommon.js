import { ref, reactive , computed, onMounted } from "vue";
import { toast } from '@/composables/util.js';
//列表分页搜索
export function useInitTable(opt = {}) {
  let searchForm = null;
  let reset = null;

  if (opt.searchForm) {
    searchForm = reactive({ ...opt.searchForm });
    reset = () => {
      for (const key in opt.searchForm) {
        searchForm.value[key] = opt.searchForm[key];
      }
      getData();
    };
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
    opt
      .getList(currentPage.value, searchForm)
      .then((res) => {
        if (opt.onGetListSuccess && typeof opt.onGetListSuccess == "function") {
          opt.onGetListSuccess(res);
        } else {
          total.value = res.totalCount;
          tableData.value = res.list;
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const handleDelete = (id)=>{
    loading.value = true
    opt.delete(id).then((res)=>{
      toast('删除成功！')
      getData()
    }).finally(()=>{
      loading.value = false
    })
  } 


  const handleChange = (value,row)=>{
    row.statusLoading = true
    opt.updateStatus(row.id,value).then((res)=>{
      toast('修改状态成功')
      row.status = value
    }).finally(()=>{
      row.statusLoading = false
    })
  }

  onMounted(()=>{
    getData()
  })

  return {
    searchForm,
    reset,
    tableData,
    loading,
    currentPage,
    total,
    limit,
    getData,
    handleDelete,
    handleChange
  };
}

export function useInitForm(opt = {}) {
  const formDrawerRef = ref();
  const formRef = ref();
  const editId = ref(0);
  const drawerTitle = computed(() => (editId.value ? "修改" : "新增"));
  const rules = opt.rules || {};
  const form = reactive({});

  const handleSubmit = () => {
    formRef.value.validate((valid) => {
      if (!valid) return;
      formDrawerRef.value.showLoading();
      const fun = editId.value
        ? opt.update(editId.value, form)
        : opt.create(form);
      fun
        .then((res) => {
          toast(drawerTitle.value + "成功！");
          opt.getData(editId.vlaue ? false : 1);
          formDrawerRef.value.close();
        })
        .finally(() => {
          formDrawerRef.value.hideLoading();
        });
    });
  };

  const resetForm = () => {
    if (formRef.value) {
      formRef.value.clearValidate();
    }
  };

  const handleCreate = () => {
    editId.value = 0;
    resetForm();
    for (const key in opt.form) {
       form[key] = opt.form[key]
    }
    formDrawerRef.value.open();
  };

  //修改
  const handleEdit = (row) => {
    resetForm();
    for (const key in opt.form) {
      form[key] = row[key];
    }

    editId.value = row.id;
    formDrawerRef.value.open();
  };

  return {
    formDrawerRef,
    formRef,
    form,
    rules,
    drawerTitle,
    handleSubmit,
    handleCreate,
    handleEdit,
  };
}
