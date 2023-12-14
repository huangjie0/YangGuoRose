<template>
  <el-aside width="220px" class="image-aside rose-p-r" v-loading="loading">
    <div class="top rose-p-a-0">
      <el-scrollbar>
        <AsideList
          v-for="(item, index) in list"
          :key="index"
          :active="activeId == item.id"
          @edit="handleEdit(item)"
          @close="handleClose(item.id)"
          @click="handleChangeActiveId(item.id)"
        >
          {{ item.name }}
        </AsideList>
      </el-scrollbar>
    </div>
    <div class="bottom rose-f-row rose-f-c">
      <el-pagination
        background
        layout="prev,next"
        :total="total"
        :current-page="currentPage"
        :page-size="limit"
        @current-change="getData"
      />
    </div>
  </el-aside>
  <FormDrawer ref="formDrawerRef" @submit="handleSubmit" :title="drawerTitle">
    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      label-width="80px"
    >
      <el-form-item prop="name" label="分类名称">
        <el-input
          v-model="form.name"
          placeholder="请输入图库分类名称"
        ></el-input>
      </el-form-item> 
      <el-form-item label="排序" prop="order">
        <el-input-number :min="0" :max="1000" v-model="form.order"></el-input-number>
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>
<script setup>
import { getImageClassList , createImageClass , updataImageClass , deleteImageClass } from "@/api/imageClass.js";
import { onMounted, ref, reactive , computed } from 'vue';
import AsideList from "@/components/AsideList.vue";
import FormDrawer from "@/components/FormDrawer.vue";
import { toast } from "@/composables/util.js";

const loading = ref(false);
const list = ref([]);
const activeId = ref(0);
const formDrawerRef = ref(null);
const formRef = ref(null);
//分页
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);
const editId = ref(0);
const form = reactive({
  name:"",
  order:50
})

const rules = {
  name:[{
        required: true,
        message: '图库分类名称不能为空！',
        trigger: 'blur'
    }]
}
const drawerTitle = computed(() => editId.value ? '修改' : '新增')

const handleSubmit = () => {
  formRef.value.validate((valid)=>{
    if(!valid) return
    formDrawerRef.value.showLoading()
    const fun = editId.value ? updataImageClass(editId.value,form) : createImageClass(form)
    .then((res)=>{
      toast(drawerTitle.value + "成功！")
      getData(editId.value ? currentPage.value : 1)
      formDrawerRef.value.close()
    }).finally(()=>{
      formDrawerRef.value.hideLoading();
    })
  })
};

//点击新增
const handleCreate = () => {
  editId.value = 0
  form.name = ''
  form.order = 50
  formDrawerRef.value.open();
};
//点击修改
const handleEdit = (row) => {
  editId.value = row.id
  form.name = row.name
  form.order = row.order
  formDrawerRef.value.open();
}
 
const getData = (page = null) => {
  if (typeof page == "number") {
    currentPage.value = page;
  }

  loading.value = true;
  getImageClassList(currentPage.value)
    .then((res) => {
      total.value = res.totalCount;
      list.value = res.list;
      let item = list.value[0];
      if (item) {
        handleChangeActiveId(item.id);
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

const handleClose = (id) => {
  loading.value = true
  deleteImageClass(id).then((res)=>{
    toast("删除成功！")
    getData()
  }).finally(()=>{
    loading.value = false
  })
}

onMounted(() => {
  getData();
});

defineExpose({
  handleCreate,
});

const emits = defineEmits(["change"])

//选中图库分类id
const handleChangeActiveId = (id) => {
  activeId.value = id
  emits("change",id)
}

</script>
<style lang="less">
.image-aside {
  border-right: 2px solid var(--rose-g2);
}

.image-aside .top {
  bottom: 50px;
}

.image-aside .bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
}
</style>
