<template>
  <div class="regis-wrap">
    <div class="username">
      <span>用户名</span>
      <el-input v-model="username"></el-input>
    </div>
    <div class="password">
      <span>密码</span>
      <el-input v-model="password"></el-input>
    </div>
    <div class="buttons">
      <el-button @click="login()">登录</el-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {},
})
export default class Regis extends Vue {}
</script>

<style lang="scss" scoped>
.regis-wrap {
  display: flex;
  margin: auto;
  width: 500px;
  height: 500px;
  padding: 50px 100px;
  border: 1px solid #333;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
      margin-bottom: 10px;
    }
  }
}
</style>
