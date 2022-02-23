<template>
  <div>
    <Title>我的信息</Title>
    <div class="infoList">
      <div>我的用户名：{{ userName }}</div>
      <div>我的邮箱： {{ userInfo.emailAddress }}</div>
      <div>我的手机号：{{ userInfo.phoneNumber }}</div>
      <div>
        我的身份：{{ userInfo.adminRole === 0 ? "超级管理员" : "管理员" }}
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
  flex-direction: column;
  justify-content: space-between;
  height: 20%;
  font-size: 1.5rem;
}
</style>
