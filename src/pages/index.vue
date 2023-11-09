<template>
  <div>
    <el-row :gutter="20">
        <template v-if="panels.length == 0">
            <el-col :span="6" v-for="i in 4" :key="i">
                <el-skeleton animated loading>
                <template #template>
                    <el-card shadow="always">
                    <template #header>
                        <div class="rose-f1">
                            <el-skeleton-item variant="text" style="width: 50%"/>
                            <el-skeleton-item variant="text" style="width: 10%"/>
                        </div>
                    </template>
                    <span class="rose-font-s1 rose-font-w2 count-value">
                        <el-skeleton-item variant="h3"  style="width: 80%"/>
                    </span>
                    <el-divider />
                    <div class="rose-f1 rose-font-s3 rose-bg">
                        <el-skeleton-item variant="text" style="width: 50%"/>
                        <el-skeleton-item variant="text" style="width: 10%"/>
                    </div>
                    </el-card>
                </template>
                </el-skeleton>
            </el-col>
        </template>

        <el-col :span="6" v-for="(item, index) in panels" :key="index">
            <el-card shadow="always">
            <template #header>
                <div class="rose-f1">
                <span class="rose-font-s2">{{ item.title }}</span>
                <el-tag :type="item.unitColor" effect="plain">
                    {{ item.unit }}
                </el-tag>
                </div>
            </template>
            <span class="rose-font-s1 rose-font-w2 count-value">
                <CountTo :value="item.value"></CountTo>
            </span>
            <el-divider />
            <div class="rose-f1 rose-font-s3 rose-bg">
                <span>{{ item.subTitle }}</span>
                <span>{{ item.subValue }} </span>
            </div>
            </el-card>
        </el-col>
    </el-row>
    <IndexNavs></IndexNavs>
  </div>
</template>
<script setup>
import { getStatistics1 } from "@/api/index.js";
import { onMounted, ref } from "vue";
import CountTo from '@/components/CountTo.vue'
import IndexNavs from '@/components/IndexNavs.vue'

const panels = ref([]);

const getDate = () => {
  getStatistics1().then((res) => {
    panels.value = res.panels;
  });
};

onMounted(() => {
  getDate();
});

</script>
<style lang="less" scoped>
.count-value {
  color: var(--rose-g4);
}
</style>
