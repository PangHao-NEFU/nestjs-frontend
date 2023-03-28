import { onMounted, reactive, ref } from "vue";
import axios from "@/utils/axios";
import * as bootstrap from "bootstrap";
interface Profile {
  gender: number|undefined;
  address: string;
  photo: string;
}

interface RoleItem {
  id: number;
  name: string;
}

interface UserItem {
  id: bigint;
  username: string;
  password?: string;
  profile: Profile;
  roles: RoleItem[];    //roles是一个数组
}

export function useGetUserData() {
  const lists = ref([] as UserItem[]);
  const tmpItem = ref({} as UserItem);

  let formValue = reactive({      //表单数据
    username: "",
    password: "",
    profile: {
      gender: undefined,
      address: "",
      photo: "",
    } as Profile,
    roles: [] as RoleItem[],
  } as UserItem);

  //判断当前是编辑还是新增,如果是编辑,记录当前item的id!
  let localType: string = "";
  let localId: bigint|undefined;

  // dom绑定
  const deleteRef = ref();
  const editRef = ref();

  // 模态框的控制handler
  const deleteModal = ref();
  const editAndAddModel = ref();
  const msg = ref("新增");

  // 获取数据
  const getData = async () => {
    const res = (await axios.get("/user/getUsers")) as UserItem[];
    if (res && res.length > 0) {
      lists.value = res;
    }
  };

  // 控制模态框
  const openModal = (type: string, item?: UserItem) => {
    localType = type;
    localId = item?.id;
    tmpItem.value = item || ({} as UserItem);
    
    
    if (type === "delete") {
      deleteModal.value.show();
    } else if (type === "edit") {
      msg.value = "编辑";
      
      //todo 模态框双向数据绑定
      Object.assign(formValue, item);
      // formValue.roles=item?.roles as RoleItem[];
      
      editAndAddModel.value.show(); //控制模态框显示与隐藏
    } else if (type === "add") {
      msg.value = "新增";
      localId = undefined;
      editAndAddModel.value.show();
      Object.assign(formValue, {
        username: "",
        password: "",
        profile: {
          gender: undefined,
          address: "",
          photo: "",
        } as Profile,
        roles: ref([] as RoleItem[]),
      });
    }
  };

  /*
   * @description: 提交表单数据,增加和修改
   * @return {*}
   */
  const editSubmit = async () => {
    // 判断用户是新增，还是编辑
    console.log("🚀 ~ file: useGetUserData.ts:100 ~ editSubmit ~ formValue:",formValue);
    if (localType === "add") {
      // 发送对应的数据到接口
      const res = await axios.post("/user/addUser", formValue);

      console.log("🚀 ~ file: index.vue ~ line 238 ~ editSubmit ~ res", res);
    }
    // todo作业 编辑
    // 编辑的时候 —> 保存id信息 -> 传参把id代上
    // 编辑之前，填充数据到form表单上 -> formValue -> mapper -> roles id
    if (localType === "edit") {
      if (!!localId) {
        const res = await axios.post(`/user/updateUser/${localId}`, formValue);
      }
    }
    // 清空form表单
    Object.assign(formValue, {
      username: "",
      password: "",
      profile: {
        gender: 0,
        address: "",
        photo: "",
      } as Profile,
      roles: ref([] as RoleItem[]),
    });
    // 关闭模态框
    editAndAddModel.value.hide();
  };

  // 删除该条数据
  const deleteSubmit = async () => {
    // 1.获取用户删除的item -> id
    const id = tmpItem.value.id;
    // 2.发送删除请求
    const res = (await axios.delete("/user/" + id)) as UserItem;
    // 3.请求成功之后关闭模态框
    console.log("🚀 ~ file: index.vue ~ line 272 ~ deleteSubmit ~ res", res);
    if (res.username === tmpItem.value.username) {
      deleteModal.value.hide();
    }
    // 获取新的列表数据并更新
    await getData();
  };

  onMounted(async () => {
    // 初始化
    await getData();

    // deleteModal.value = new bootstrap.Modal(
    //   document.getElementById("DeleteModal")!,
    //   { backdrop: true }
    // );

    // 模态框创建
    deleteModal.value = new bootstrap.Modal(deleteRef.value, {
      backdrop: true,
    });
    editAndAddModel.value = new bootstrap.Modal(editRef.value, {
      backdrop: true,
    });
  });

  return {
    formValue,
    deleteRef,
    editRef,
    lists,
    openModal,
    msg,
    editSubmit,
    deleteSubmit,
    getData,
  };
}
