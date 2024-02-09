<template>
  <div>
    <a-card
      hoverable
      style="
        box-shadow: rgb(0, 0, 0.15) 0px 2px 5px 0px;
        width: 350px;
        height: 620px;
      "
    >
      <template #cover>
        <img alt="example" src="@/assets/03-vuejs-login.png" />
      </template>
      <h1 className="text-2xl font-bold pb-3">Login</h1>

      <a-form
        layout="vertical"
        :model="formState"
        :rules="rules"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <a-form-item name="username">
          <a-input placeholder="Username" v-model:value="formState.username">
            <template #prefix
              ><UserOutlined style="color: rgb(0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>

        <a-form-item name="password">
          <a-input-password
            type="password"
            placeholder="Password"
            v-model:value="formState.password"
          >
            <template #prefix
              ><LockOutlined style="color: rgb(0, 0, 0.25)"
            /></template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-space direction="vertical" style="width: 100%" size="small">
            <a-button block type="primary" html-type="submit">Login</a-button>

            <a-button
              block
              type="default"
              html-type="button"
              @click="$router.push('/register')"
              >Register</a-button
            >

            <a-button
              block
              type="default"
              html-type="button"
              @click="handleReset"
              >Reset</a-button
            >
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts">
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { reactive } from "vue";
import type { User } from "@/models/user.model";
import { Rule } from "ant-design-vue/lib/form";
import httpClient from "@/services/httpClient";

export default {
  components: {
    UserOutlined,
    LockOutlined,
  },
  name: "Login",
  setup() {
    const formState = reactive<User>({
      username: "admin",
      password: "1234",
    });

    const handleFinish = async (values: any) => {
      const result = await httpClient.post("/login", values);

      alert(JSON.stringify(result.data));
    };

    const handleFinishFailed = (error: any) => {
      alert(JSON.stringify(error));
    };

    const handleReset = () => {
      formState.username = "";
      formState.password = "";
    };

    let validateUsername = async (_rule: Rule, value: string) => {
      if (value === "") {
        return Promise.reject("Please input the username");
      } else if (value.length <= 4) {
        return Promise.reject("username must greater than 4 letters");
      } else {
        return Promise.resolve();
      }
    };

    let validatePassword = async (_rule: Rule, value: string) => {
      if (value === "") {
        return Promise.reject("Please input the password");
      } else if (value.length <= 1) {
        return Promise.reject("Passwowrd must greater than 10 letters");
      } else {
        return Promise.resolve();
      }
    };

    const rules: Record<string, Rule[]> = {
      username: [
        { required: true, validator: validateUsername, trigger: "change" },
      ],
      password: [
        { required: true, validator: validatePassword, trigger: "change" },
      ],
    };

    return {
      formState,
      handleFinish,
      handleReset,
      handleFinishFailed,
      rules,
    };
  },
};
</script>

<style></style>
