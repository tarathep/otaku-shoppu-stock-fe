<template>
  <a-card hoverable class="tw-rounded-md tw-drop-shadow-sm tw-transition-all">
    <a-row align="center" justify="center" class="tw-h-full">
      <a-col :span="16">
        <a-card-meta :title="props.title?.toUpperCase()">
          <template #description>{{ filters.currency(props.amount) }}</template>
        </a-card-meta>
      </a-col>
      <a-col :span="8">
        <a-tag
          :color="props.color"
          class="tw-text-4xl tw-p-2 tw-py-4 tw-w-full"
        >
          <a-row justify="center">
            <ShoppingCartOutlined v-if="props.icon == 'ShoppingCartOutlined'" />
            <ExperimentOutlined
              v-else-if="props.icon == 'ExperimentOutlined'"
            />
            <RollbackOutlined v-else-if="props.icon == 'RollbackOutlined'" />
            <GiftOutlined v-else />
          </a-row>
        </a-tag>
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts" setup>
import {
  ShoppingCartOutlined,
  ExperimentOutlined,
  RollbackOutlined,
  GiftOutlined,
} from "@ant-design/icons-vue";
import filters from "@/services/filters";

const props = defineProps({
  title: String,
  amount: Number,
  icon: String,
  color: String,
});
</script>

<style lang="scss" scoped></style>
