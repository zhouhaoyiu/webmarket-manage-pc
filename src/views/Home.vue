<template>
  <div class="home">
    <div class="sideBar">
      <div>欢迎您</div>
      <div>{{ userName }}</div>
      <div class="buttons">
        <div class="muInfo">
          <button @click="goPage('userInfo')">个人信息</button>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Home extends Vue {
  private goPage(page: string): void {
    this["$router"].push(`/home/${page}`);
  }

  get userName(): string {
    return "axios";
  }
  mounted(): void {
    if (!localStorage.getItem("userUUid")) {
      this["$router"].push("/Login");
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: wrap;
  .sideBar {
    display: flex;
    flex-direction: column;
    background-color: black;
    color: #fff;
    height: 100%;
    padding: 0 20px;
  }
}
</style>
