import { ref, reactive } from "vue";
import { updatepassword, logOut } from "@/api/manager.js";
import { toast, showModal } from "@/composables/util.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export function useRepassword() {
  const formRef = ref();
  const formDrawerRef = ref();

  const router = useRouter();
  const store = useStore();

  const form = reactive({
    oldpassword: "",
    passWord: "",
    repassword: "",
  });

  const rules = {
    oldpassword: [
      {
        required: true,
        message: "旧密码不能为空！",
        trigger: "blur",
      },
    ],
    passWord: [
      {
        required: true,
        message: "新密码不能为空！",
        trigger: "blur",
      },
    ],
    repassword: [
      {
        required: true,
        message: "确认密码不能为空！",
        trigger: "blur",
      },
    ],
  };

  const openRepassWordForm = () => {
    formDrawerRef.value.open();
  };

  const onSubmit = () => {
    formRef.value.validate((vaild) => {
      if (!vaild) {
        return false;
      }

      formDrawerRef.value.showLoading();
      updatepassword(form)
        .then((res) => {
          toast("修改密码成功，请重新登录！");
          store.dispatch("logout");
          //跳转到登录页
          router.push("/login");
        })
        .finally(() => {
          formDrawerRef.value.hideLoading();
        });
    });
  };
  return {
    formDrawerRef,
    formRef,
    form,
    rules,
    onSubmit,
    openRepassWordForm,
  };
}

export function useLogOut() {
  const router = useRouter();
  const store = useStore();

  const handleLogout = () => {
    showModal("是否要退出登录？").then((res) => {
      logOut().finally(() => {
        store.dispatch("logout");
        //跳转登录页
        router.push("/login");
        //提示
        toast("退出登录成功！");
      });
    });
  };
  return {
    handleLogout,
  };
}
