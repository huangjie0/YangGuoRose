<template>
    <el-card shadow="always">
      <ListHeader @create="handleCreate" @refresh="getData"/>
      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading" :height="tableHeight">
        <el-table-column label="优惠券名称" width="380">
            <template #default="{ row }">
                <div class="couponBorder" :class="row.statusText == '领取中' ? 'active' :'inactive'">
                    <h5 class="rose-font-w2 rose-font-s3">{{ row.name }}</h5>
                    <small>{{ row.start_time }} ~ {{ row.end_time }}</small>
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="statusText" label="状态" />
        <el-table-column label="优惠" width="380">
            <template #default="{ row }">
                {{row.type == 0 ? "满减" : "折扣"}} {{ row.type ? ("￥" + row.value ) : (row.value + "折") }}
            </template>
        </el-table-column>
        <el-table-column prop="total" label="发放数量"/>
        <el-table-column prop="used" label="已使用" />
        <el-table-column label="操作" with="380" align="center">
          <template #default="scope"> 
            <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
            <el-popconfirm title="是否要删除改优惠券？" confirm-button-text="确认" cancel-button-text="取消" @confirm="handleDelete(scope.row.id)">
                <template #reference>
                    <el-button size="small" type="danger" >删除</el-button>
                </template>
            </el-popconfirm>

            <el-popconfirm title="是否要该优惠券失效？" confirm-button-text="失效" cancel-button-text="取消" @confirm="handleDelete(scope.row.id)">
                <template #reference>
                    <el-button size="small" type="warning">失效</el-button>
                </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="rose-f-row pagination">
        <el-pagination
          background
          layout="prev,pager,next"
          :total="total"
          :current-page="currentPage"
          :page-size="limit"
          @current-change="getData"
        />
      </div>
      <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit"> 
          <el-form :model="form" ref="formRef" :rules="rules" label-width="100px" :inline="false">
            <el-form-item label="优惠券名称" prop="name"> 
              <el-input v-model="form.name" placeholder="优惠券名称" class="value-input"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type"> 
                <el-radio-group v-model="form.type">
                    <el-radio :label="0" border>满减</el-radio>
                    <el-radio :label="1" border>折扣</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="面值" prop="value"> 
                <el-input v-model="form.value" placeholder="面值" class="value-input">
                    <template #append>
                        {{ form.value ? '折' : '元' }}
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="发行量" prop="total"> 
              <el-input-number v-model="form.total" placeholder="发行量" :min="0" :max="10000" :step="1" step-strictly></el-input-number>
            </el-form-item>
            <el-form-item label="最低使用价格" prop="min_price"> 
              <el-input-number v-model="form.min_price" placeholder="最低使用价格"></el-input-number>
            </el-form-item>
            <el-form-item label="排序" prop="order"> 
              <el-input-number v-model="form.order" placeholder="排序"></el-input-number>
            </el-form-item>
            <el-form-item label="活动时间"> 
                <el-date-picker
                  :editable="false"
                  v-model="timeRanger"
                  type="datetimerange"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  class="date-value"
                />
            </el-form-item>
            <el-form-item label="描述" prop="desc"> 
              <el-input v-model="form.content" placeholder="公告内容" type="textarea" :rows="5"></el-input>
            </el-form-item>
          </el-form>
      </FormDrawer>
    </el-card>
  </template>
  <script setup>
  import { computed } from 'vue';
  import { getCouponList,createCoupon,updateCoupon,deleteCoupon,updateCouponStatus } from '@/api/coupon.js'
  import FormDrawer from '@/components/FormDrawer.vue';
  import { useInitTable,useInitForm } from '@/composables/useCommon.js'
  import ListHeader from '@/components/ListHeader.vue'
  
  const { tableData,loading,currentPage,total,limit,getData,handleDelete} = useInitTable({
    getList:getCouponList,
    delete:deleteCoupon,
    onGetListSuccess: (res)=>{
        tableData.value = res.list.map(o => {
        o.statusText = formatStatus(o)
        return o
    })
    total.value = res.totalCount 
    }
  })
  
  const { formDrawerRef,formRef,form,drawerTitle,rules,handleSubmit,handleCreate,handleEdit } = useInitForm({
    getData,
    update:updateCoupon,
    create:createCoupon,
    beforeSubmit:(f)=>{
      if(typeof f.start_time !== "number"){
        f.start_time = (new Date(f.start_time)).getTime()
      }
      if(typeof f.end_time !== "number"){
        f.end_time = (new Date(f.end_time)).getTime()
      }
      return f
    },
    form:{
      name:'',
      type:0,
      value:0,
      total:100,
      min_price:0,
      start_time:null,
      end_time:null,
      order:50,
      desc:""
    }
  })
  
  const tableHeight = computed(()=>{
    return (window.innerHeight - 270) + 'px';
  }
  )

  const formatStatus = (row)=>{
    let s = "领取中"
    let start_time = (new Date(row.start_time)).getTime()
    let now_time = (new Date()).getTime()
    let end_time = (new Date(row.end_time)).getTime()
    if(start_time > now_time){
        s = '未开始'
    }else if(end_time < now_time){
        s = '已结束'
    }else if(row.status == 0){
        s = '已结束'
    }
    return s
  }

  const timeRanger = computed({
    get(){
        return form.start_time && form.end_time ?  [form.start_time,form.end_time] : []
    },
    set(value){
        form.start_time = value[0]
        form.end_time = value[1]
    }
  })
  
  </script>
  <style lang="less" scoped>
  .pagination{
    justify-content: center;
    align-items: center;
    margin-top:20px;
  }
  
  .couponBorder{
    width:380px;
    border:var(--common-split4) solid red;
    background-color:red;
  }
  .active{
    border:1px solid var(--rose-r1);
    background-color:var(--rose-r2);
    color:red;
  }
  .inactive{
    border:var(--common-split4) solid var(--rose-g3);
    background-color:var(--rose2);
    color:var(--rose-g5);
  }
  .value-input,{
    width:50%;
  }
  </style>
  