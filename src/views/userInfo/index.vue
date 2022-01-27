<template>
  <div>
    <Title>用户信息</Title>
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
  }
  get userInfo(): adminInfoType {
    return this.$store.getters[GET_ADMIN_INFO];
  }

  get userName(): string {
    return this.$store.getters[GET_ADMIN_INFO].userName;
  }
}
</script>

<style lang="scss" scoped></style>
