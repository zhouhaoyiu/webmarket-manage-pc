<template>
  <div class="regis">
    <div class="regis-wrap">
      <el-form
        ref="ruleForm"
        :rules="rules"
        :model="formData"
        label-position="left"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formData.password"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input
            v-model="formData.mobile"
            type="text"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="formData.email"
            type="text"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="pin码" prop="pin">
          <el-input
            v-model="formData.pin"
            type="text"
            auto-complete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary">注册管理员</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {},
})
export default class Regis extends Vue {
  private formData = {
    username: "",
    password: "",
    mobile: "",
    email: "",
    pin: "",
  };
  private checkPhone = (
    rule: never,
    value: string,
    callback: (arg0?: Error) => void
  ) => {
    const phoneReg = /^1[3|4|5|7|8|9][0-9]{9}$/;
    if (!value) {
      return callback(new Error("电话号码不能为空"));
    }
    setTimeout(() => {
      // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
      // 所以我就在前面加了一个+实现隐式转换
      if (!Number.isInteger(+value)) {
        callback(new Error("请输入数字值"));
      } else {
        if (phoneReg.test(value)) {
          callback();
        } else {
          callback(new Error("电话号码格式/长度不正确"));
        }
      }
    }, 100);
  };
  private checkEmail = (
    rule: never,
    value: string,
    callback: (arg0?: Error) => void
  ) => {
    const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if (!value) {
      return callback(new Error("邮箱不能为空"));
    }
    setTimeout(() => {
      if (mailReg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的邮箱格式"));
      }
    }, 100);
  };
  private checkPin = (
    rule: never,
    value: string,
    callback: (arg0?: Error) => void
  ) => {
    const pinReg = /[\s\S]{6,}/;
    if (!value) {
      return callback(new Error("pin码不能为空"));
    }
    setTimeout(() => {
      if (pinReg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入6位以上的pin码"));
      }
    }, 100);
  };

  private rules = {
    username: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
    ],
    password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" },
    ],
    mobile: [
      {
        required: true,
        trigger: "blur",
        validator: this.checkPhone,
      },
    ],
    email: [
      {
        required: true,
        trigger: "blur",
        validator: this.checkEmail,
      },
    ],
    pin: [
      {
        required: true,
        trigger: "blur",
        validator: this.checkPin,
      },
    ],
  };
}
</script>

<style lang="scss" scoped>
.regis {
  width: 100%;
  height: 100%;
  display: flex;
  background: #282c34;
  .regis-wrap {
    display: flex;
    margin: auto;
    width: 660px;
    height: 450px;
    padding: 50px 100px;
    border: 1px solid #333;
    border-radius: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: whitesmoke;
  }
}
</style>
