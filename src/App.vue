<template>
  <div>
    <h1>NTT: {{ tmp }}</h1>
    <button @click="clickMe">click Me</button>

    <a-button type="primary">Primary Button</a-button>
    <a-button>Default Button</a-button>
    <a-button type="dashed">Dashed Button</a-button>
    <a-button type="text">Text Button</a-button>
    <a-button type="link">Link Button</a-button>

    <a-button type="primary">
      <template #icon><SearchOutlined /></template>
      Search
    </a-button>

    <h1
      class="text-red-400 bg-yellow-400 text-3xl font-bold underline border-double border-4 border-indigo-600 rounded-xl"
    >
      Hello World
    </h1>
  </div>
</template>

<script lang="ts">
import SearchOutlined from "@ant-design/icons-vue/SearchOutlined";

export default {
  components: { SearchOutlined },
  // lanmda function
  setup: () => {
    const tmp = "Bokie";

    const clickMe = () => {
      alert("Hey");
    };

    return { tmp, clickMe };
  },
};
</script>

<style></style>
