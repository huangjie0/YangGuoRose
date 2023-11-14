<template>
  <el-aside width="220px" class="image-aside rose-p-r">
    <div class="top rose-p-a-0">
      <el-scrollbar>
        <div class="aside-list rose-f-row rose-font-s3 rose-bg2 rose-f1"> 
            <span class="rose-text-overflow span-title">分类标题</span>  
            <el-button text type="primary" size="small">
                <el-icon :size="12"><Edit /></el-icon>
            </el-button>
            <el-button text type="primary" size="small">
                <el-icon :size="12"><Close /></el-icon>
            </el-button>
        </div>
      </el-scrollbar>
    </div>
    <div class="bottom rose-f-row rose-f-c">分页部分</div>
  </el-aside>
</template>
<script setup>

</script>
<style lang="less">
.image-aside{
  border-right: 2px solid var(--rose-g2);
}

.image-aside .top{
    bottom: 50px;
    .aside-list{
        border-bottom:1px solid var(--rose-g2);
        align-items: center;
        padding:0 var(--common-split);
        .span-title{
            width:80%;
        }
        &:hover{
            cursor:pointer;
            background-color:var(--rose-p3);
        }
    }
}

.image-aside .bottom{
    position: absolute;
    bottom: 0;
    left:0;
    right:0;
    height: 50px;
}

</style>
