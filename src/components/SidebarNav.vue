<template>
  <div class="nav-bg flex-fill">
    <ul class="nav flex-column">
      <li class="nav-item  py-1" v-for="item in menus" :key="item.id">
        <router-link class="nav-link text-white-50 d-flex align-items-center cursor" aria-current="page" :to="item.routeName ? {name: item.routeName} :item.path">
          <i :class="[getIcon(item), 'pe-3 text-light']"></i>{{item.name}}
        </router-link>
      </li>
      <!-- <li class="nav-item">
        <router-link class="nav-link" :to="{name: 'users'}">用户管理</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{name: 'roles'}">角色管理</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{name: 'menus'}" tabindex="-1" aria-disabled="true">菜单管理</router-link>
      </li> -->
    </ul>
  </div>
</template>

<!-- <script lang="ts">

import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";
import { MenuItem } from "./types/SidebarNav";

export default defineComponent({
  props: {
    menus: {
      type: Array as PropType<Array<MenuItem>>,
      default: () => [] as MenuItem[],
    },
  },
  setup() {
    const router = useRouter();

    // 获取meta中的icon信息
    function getIcon(item: MenuItem) {
      const res = router
        .getRoutes()
        .find((o) =>
          item.routeName ? o.name === item.routeName : o.path === item.path
        );
      return res?.meta?.icon;
    }

    return {
      getIcon,
    };
  },
});
</script> -->

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { MenuItem } from "./types/SidebarNav";

interface Props {
  menus: Array<MenuItem>;
}

const props = defineProps<Props>();

const { getRoutes } = useRouter();

// 获取meta中的icon信息,添加到左侧菜单栏的左边
function getIcon(item: MenuItem) {
  const res = getRoutes().find((obj) =>
    item.routeName ? obj.name === item.routeName : obj.path === item.path
  );
  return res?.meta?.icon;
}
</script>

<style lang="scss" scoped>
.nav-item {
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  .active {
    background: rgba(255, 255, 255, 0.3);
  }
}
</style>