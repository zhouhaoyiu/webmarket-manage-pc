<template>
  <div class="login">
    <div class="login-wrap">
      <div class="username">
        <span>用户名：</span>
        <el-input v-model="username" placeholder="请输入用户名"></el-input>
      </div>
      <div class="password">
        <span>密码： </span>
        <el-input
          show-password
          placeholder="请输入密码"
          v-model="password"
        ></el-input>
      </div>
      <div class="buttons">
        <el-button
          class="login-button"
          size="medium"
          type="primary"
          @click="login()"
          >登录</el-button
        >
        <el-button
          class="login-button"
          size="medium"
          type="primary"
          @click="regis()"
          >注册</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { JSEncrypt } from "jsencrypt";

@Component({
  components: {},
})
export default class Login extends Vue {
  private username = "";
  private password = "";

  private login(): void {
    const jsencrypt = new JSEncrypt();
    jsencrypt.setPublicKey(localStorage.getItem("publicKey") || "");
    this["axios"].post("admin/adminLogin", {
      userName: this.username,
      passWord: jsencrypt.encrypt(this.password),
    });
    // this["$router"].push("/Home");
    // localStorage.setItem("userUUid", this.username);
  }

  private regis(): void {
    this["$router"].push("/regis");
  }
  mounted(): void {
    //
  }
}
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  background: #282c34;
  .login-wrap {
    display: flex;
    margin: auto;
    width: 500px;
    height: 350px;
    padding: 50px 100px;
    border: 1px solid #333;
    border-radius: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: whitesmoke;

    .username,
    .password {
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      span {
        width: 100px;
        line-height: 40px;
        padding-left: 5px;
        text-align: left;
      }
    }
    .buttons {
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-top: 10px;
      .login-button {
        width: 100%;
        margin: 10px 0px;
      }
    }
  }
}
</style>
