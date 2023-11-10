<template>
  <div class="rose-bg-p fheader rose-f-row">
    <span class="logo rose-f-c rose-font-w3 rose-font-s2">
      <el-icon class="title-logo">
        <ElemeFilled />
      </el-icon>
      洋果子Rose
    </span>
    <el-tooltip effect="customized" content="收缩菜单" placement="bottom">
      <el-icon
        class="icon-btn rose-f-c"
        @click="$store.commit('HANDLE_ASIDE_WIDTH')"
      >
        <Fold v-if="$store.state.asideWidth == '250px'" />
        <Expand v-else />
      </el-icon>
    </el-tooltip>
    <el-tooltip effect="customized" content="刷新" placement="bottom">
      <el-icon class="icon-btn rose-f-c" @click="handleRefresh">
        <Refresh />
      </el-icon>
    </el-tooltip>
    <div class="lft-auto rose-f-c">
      <el-tooltip effect="customized" content="全屏" placement="bottom">
        <el-icon @click="toggle">
          <FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>
      <el-dropdown @command="handleCommand" class="dropdown rose-f-c">
        <span class="el-dropdown-link rose-f-row">
          <el-avatar
            :size="25"
            :src="$store.state.user.avatar"
            class="avatar"
          />
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <!-- 抽屉组件 -->
  <FormDrawer
    ref="formDrawerRef"
    title="修改密码"
    :destroy-on-close="true"
    @submit="onSubmit"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      label-width="80px"
      size="small"
    >
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input
          v-model="form.oldpassword"
          placeholder="请输入旧密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="passWord" label="新密码">
        <el-input v-model="form.passWord" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input
          v-model="form.repassword"
          placeholder="请输入确认密码"
        ></el-input>
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>
<script setup>
import { useFullscreen } from "@vueuse/core";
import FormDrawer from "@/components/FormDrawer.vue";
import { useRepassword, useLogOut } from "@/composables/useManage.js";

const { toggle, isFullscreen } = useFullscreen();
const { formDrawerRef, formRef, form, rules, onSubmit, openRepassWordForm } =
  useRepassword();
const { handleLogout } = useLogOut();

const handleCommand = (c) => {
  switch (c) {
    case "rePassword":
      openRepassWordForm();
      break;
    case "logout":
      handleLogout();
      break;
  }
};

const handleRefresh = () => {
  window.location.reload();
};

</script>

<style lang="less" scoped>
.fheader {
  color: var(--rose-w);
  height: 64px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  align-items: center;
  z-index:1000;

  .icon-btn {
    width: 42px;
    height: 64px;
    &:hover{
      cursor: pointer;
    }
  }

  .logo {
    width: 250px;

    .title-logo {
      margin-right: 10px;
    }
  }

  .lft-auto {
    margin-left: auto;
    padding-right: 20px;
    &:hover{
      cursor: pointer;
    }

    .dropdown {
      height: 64px;
      margin: 0 10px;
      color: var(--rose-w);
    }

    .el-dropdown-link {
      align-items: center;

      .avatar {
        margin: 0 8px;
      }
    }
  }
}
</style>
