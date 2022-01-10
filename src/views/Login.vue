<template>
  <div class="login-wrap">
    <div class="username">
      <span>用户名</span>
      <el-input v-model="username"></el-input>
    </div>
    <div class="password">
      <span>密码</span>
      <el-input></el-input>
    </div>
    <div class="buttons">
      <el-button @click="login()">登录</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Login extends Vue {
  private username = "fff";
  private login(): void {
    this["$router"].push("/Home");
    localStorage.setItem("userUUid", this.username);
  }
  mounted(): void {
    console.log(123321123);
  }
}
</script>
<style lang="scss" scoped>
.login-wrap {
  display: flex;
  margin: auto;
  width: 500px;
  height: 500px;
  border: 1px solid #333;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .username,
  .password {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    span {
      margin-bottom: 10px;
    }
  }
}
</style>
