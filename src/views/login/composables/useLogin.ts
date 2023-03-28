import { reactive, computed } from "vue";
import { useRouter } from "vue-router";

export function useLogin() {
    const router = useRouter();
    const loginInfo = reactive({
        username: "",
        //用户名校验
      usernameMsg: computed(() => {
          if (
          loginInfo.username !== "" &&
          !/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim.test(loginInfo.username)
        ) {
          return "请输入正确的邮箱地址";
        }
        return "";
      }),
        password: "",
      //密码校验
      passwordMsg: computed(() => {
        if (loginInfo.password !== "" && loginInfo.password.length < 6) {
          return "密码的长度不能小于6位";
        }
        return "";
      }),
    });

    const submit = () => {
      console.log(loginInfo);
      router.push("/home");
      // axios.post("/auth/login", loginInfo).then((res) => {
      //   console.log(res);
      // });
    };
    return {
        loginInfo,
        submit,
    }
};
