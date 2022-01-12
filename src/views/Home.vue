<template>
  <div class="home">
    <div class="sideBar">
      <div class="info">
        <div class="info-title">欢迎您</div>
        <div class="info-name">{{ userName }}</div>
      </div>
      <div class="buttons">
        <div class="button">
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
  async mounted(): Promise<void> {
    if (!localStorage.getItem("userUUid")) {
      this["$router"].push("/login");
    }

    let publicKey: { [x: string]: string; data: string };
    publicKey = await this["axios"].get("rsa/pubKey");
    if (String(publicKey["status"]) === "200") {
      localStorage.setItem("publicKey", publicKey.data);
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: wrap;
  width: 100%;
  height: 100%;
  .sideBar {
    display: flex;
    flex-direction: column;
    background-color: black;
    color: #fff;
    height: 100%;
    width: 200px;
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px 0;
      .info-title {
        font-size: 20px;
        font-weight: bold;
      }
      .info-name {
        font-size: 16px;
      }
    }
    .buttons {
      display: flex;
      width: 100%;
      flex-direction: column;
      .button {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 40px;
        justify-content: space-between;
        button {
          width: 100%;
          height: 100%;
          border: none;
          background-color: blue;
          color: #fff;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
