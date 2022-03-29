<template>
  <div>
    <Title>个人信息</Title>
    <div class="infoList">
      <div class="infoCard">
        <div class="infoTitle">用户名</div>
        <div class="infoText">{{ userName }}</div>
      </div>
      <div class="infoCard">
        <div class="infoTitle">邮箱</div>
        <div class="infoText">{{ userInfo.emailAddress }}</div>
      </div>
      <div class="infoCard">
        <div class="infoTitle">手机号</div>
        <div class="infoText">{{ userInfo.phoneNumber }}</div>
      </div>
      <div class="infoCard">
        <div class="infoTitle">身份</div>
        <div class="infoText">
          {{ userInfo.adminRole === 0 ? "超级管理员" : "管理员" }}
        </div>
      </div>
    </div>
    <div class="infoCard">
      <div class="infoTitle">登录记录</div>
      <div class="infoText">
        {{ userInfo.adminRole === 0 ? "超级管理员" : "管理员" }}
      </div>
    </div>
    <div class="infoCard">
      <div class="infoTitle">登录分析</div>
      <div class="infoText">
        {{ userInfo.adminRole === 0 ? "超级管理员" : "管理员" }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { adminInfoType } from "@/types/type";
import { GET_ADMIN_INFO } from "@/store/type/getter-type";
import Title from "../../components/title.vue";
@Component({
  components: {
    Title,
  },
})
export default class userInfo extends Vue {
  mounted(): void {
    //
    console.log(this.$store.getters[GET_ADMIN_INFO]);
  }
  get userInfo(): adminInfoType {
    return this.$store.getters[GET_ADMIN_INFO];
  }

  get userName(): string {
    return this.$store.getters[GET_ADMIN_INFO].userName;
  }
}
</script>

<style lang="scss" scoped>
.infoList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
  .infoCard {
    width: 340px;
    height: 190px;
    padding: 40px;
    margin-top: 20px;
    margin-left: 20px;
    background: #fff;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    .infoTitle {
      font-size: 32px;
      font-weight: bold;
    }
    .infoText {
      font-size: 24px;
      color: #666;
    }
  }
}
</style>
