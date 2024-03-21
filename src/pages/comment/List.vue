<template>
    <el-card shadow="always">
        <!-- 表单公共搜索区域 -->
        <Search @search="getData" @reset="reset" :model="searchForm">
            <SearchItem label="关键词">
                <el-input v-model="searchForm.title" placeholder="商品标题" clearable></el-input>
            </SearchItem>
        </Search>

        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading" :height="tableHeight">
            <el-table-column type="expand">
                <template #default="{ row }">
                    <div class="rose-f-row"> 
                        <el-avatar :size="50" :src="row.user.avatar" fit="fill" class="rose-mr-1"></el-avatar>
                        <div class="rose-f-1">
                            <h6 class="rose-f-row" style="align-items: center;">
                                {{ row.user.nickname  || row.user.username }}
                                <small>{{  row.review_time }}</small>
                                <el-button size="small" class="rose-ml-a" v-if="!row.textareaEdit && !row.extra" >回复</el-button>
                            </h6>
                            {{ row.review.data }}
                            <div class="review-image rose-br-s1">
                                <el-image :src="item" fit="cover" :lazy="true" v-for="(item,index) in row.review.image" :key="index"></el-image>
                            </div>
                            <div v-if="row.textareaEdit">
                                <el-input type="textarea" v-model="textarea"  placeholder="请输入评价内容" :rows="2" clearable></el-input>
                                <div class="rose-mt-1">
                                    <el-button type="primary" size="small" @click="recover(row)">回复</el-button>
                                    <el-button size="small" @click="row.textareaEdit = false">取消</el-button>
                                </div>
                            </div>
                            <template v-else>
                                <div v-for="(item,index) in row.extra" class="customer-service" :key="index">
                                    <h6 class="rose-f-row">
                                        客服
                                        <el-button type="info" class="rose-ml-a" size="small" @click="edit(row,item.data)">修改</el-button>
                                    </h6>
                                    <p>{{ item.data }}</p>
                                </div>
                            </template>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="ID" align="center" width="70" prop="id"></el-table-column>
            <el-table-column label="商品">
                <template #default="scope">
                    <div class="manager rose-f-row"> 
                        <el-image :src="scope.row.goods_item ? scope.row.goods_item.cover : ''" :lazy="true" fit="fill"
                         class="rose-br-s1 comment"></el-image>
                        <div class="manager-info">
                            <h6>{{ scope.row.goods_item?.title ?? '商品已被删除'}}</h6>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="评价信息">
                <template #default="scope">
                    <div>
                        <p>用户：{{ scope.row.user.nickname || scope.row.user.username }}</p>
                        <p>
                            <el-rate
                                v-model="scope.row.rating"
                                disabled
                                show-score
                                text-color="#ff9900"
                                >
                            </el-rate>
                        </p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="评价时间" align="center" prop="review_time"/>
            <el-table-column label="状态" align="center">
                <template #default="scope">
                    <el-switch :disabled = "scope.row.super == 1" :loading="scope.row.statusLoading" 
                    active-color="#a781ee" v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="handleChange($event,scope.row)"/>
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
    </el-card>
</template>
<script setup>
import { computed , ref } from 'vue';
import { getGoodsCommentList,updateGoodsCommentStatus,reviewGoodsComment} from '@/api/comment.js';
import {useInitTable} from '@/composables/useCommon.js'
import Search from '@/components/Search.vue';
import SearchItem from '@/components/SearchItem.vue';
import { toast } from '@/composables/util.js';
  
const { searchForm,reset,tableData,loading,currentPage,total,limit,getData,handleChange } = useInitTable({
getList:getGoodsCommentList,
updateStatus:updateGoodsCommentStatus,
onGetListSuccess:(res)=>{
    tableData.value = res.list.map(o=>{
        o.statusLoading = false
        o.textareaEdit = false
        return o
    })
    console.log(res);
    total.value = res.totalCount
    },
    searchForm:{
        title:''
    }
})

const textarea = ref('')

const tableHeight = computed(()=>{
        return (window.innerHeight - 330) + 'px';
    }
)

const edit = (row,data='')=>{
    textarea.value = data
    row.textareaEdit = true
}

const recover = (row)=>{
    if(textarea.value == ''){
        return toast('回复不能为空','error')
    }
    reviewGoodsComment(row.id,textarea.value).then(res=>{
        row.textareaEdit = false;
        toast('回复成功！')
        getData()
    })
}
  
</script>
<style lang="less" scoped>
.pagination{
    justify-content: center;
    align-items: center;
    margin-top:20px;
}
.manager{
    align-items: center;
    .comment{
        width: 50px;
        height: 50px;
    }
    &-info{
        margin-left:10px;
    }
}

.review-image{
    width: 100px;
    height: 100px;
    .customer-service{
        background-color: var(--rose-g3);
        margin-top: 20px;
    }
}
</style>
  
