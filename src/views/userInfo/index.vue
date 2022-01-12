<template>
  <div>
    {{ userInfo }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { adminInfoType } from "@/types/type";
import { GET_ADMIN_INFO } from "@/store/type/getter-type";
@Component({
  components: {},
})
export default class userInfo extends Vue {
  mounted(): void {
    //
  }
  get userInfo(): adminInfoType {
    return this.$store.getters[GET_ADMIN_INFO];
  }
}
</script>

<style lang="scss" scoped></style>
