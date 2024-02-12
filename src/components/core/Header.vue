<template>
  <a-layout-header class="bg-sky-700 pl-7 pr-5 text-white">
    <div style="display: flex; flex-direction: row; align-items: center">
      <menu-unfold-outlined
        v-if="collapsed"
        class="trigger"
        @click="toggleCollapsed"
      />
      <menu-fold-outlined v-else class="trigger" @click="toggleCollapsed" />
      <span style="flex-grow: 1; margin-left: 10px; font-size: 18px"
        >OTAKU SHOPPU STOCK</span
      >
      <a-button type="text" class="p-0" @click="authStore.logout">
        <LogoutOutlined style="color: white" />
        <span style="color: white; font-size: 18px">Logout</span>
      </a-button>
    </div>
  </a-layout-header>
</template>

<script lang="ts">
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";
import { useAuthStore } from "@/stores/useAuthStore";

export default {
  name: "Header",
  props: ["collapsed"],
  emits: ["update:collapsed"],
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LogoutOutlined,
  },
  setup(props, { emit }) {
    const authStore = useAuthStore();

    const toggleCollapsed = () => {
      emit("update:collapsed", !props.collapsed);
    };
    return { toggleCollapsed, authStore };
  },
};
</script>

<style>
.trigger {
  font-size: 18px;
  cursor: pointer;
}
</style>
